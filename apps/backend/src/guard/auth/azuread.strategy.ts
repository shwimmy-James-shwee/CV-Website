import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { passportConfig as authConfig } from '../../config/auth-config';
import { PassportStrategy } from '@nestjs/passport';
import { BearerStrategy, IBearerStrategyOptionWithRequest } from 'passport-azure-ad';
import { UserService } from '../../api/admin/user/user.service';
import { Prisma } from '@prisma/client';
import { env } from '../../config/env';
import { Request } from 'express';
import { Cache } from 'cache-manager';

export type AzureADPayload = {
  tid: string;
  name: string;
  email: string;
  mail: string;
  idp: string;
  idp_access_token: string;
  jobTitle: string;
  oid: string;
  sub: string;
  emails: string[];
  given_name: string;
  family_name: string;
  nonce: string;
  scp: string;
  azp: string;
  ver: string;
  iat: number;
  aud: string;
  exp: number;
  iss: string;
  nbf: number;
};

const options: IBearerStrategyOptionWithRequest = {
  identityMetadata: `https://${authConfig.metadata.b2cDomain}/${authConfig.credentials.tenantName}/${authConfig.policies.policyName}/${authConfig.metadata.version}/${authConfig.metadata.discovery}`,
  clientID: authConfig.credentials.clientID,
  audience: authConfig.credentials.clientID,
  policyName: authConfig.policies.policyName,
  isB2C: authConfig.settings.isB2C,
  validateIssuer: true,
  // passReqToCallback: authConfig.settings.passReqToCallback,
  passReqToCallback: false,
  loggingLevel: 'warn',
  loggingNoPII: false, // set this to true in the authConfig.js if you want to enable logging and debugging
};

type UserWithSignInLog = Prisma.UserGetPayload<{
  include: { SignInLogs: true };
}>;

@Injectable()
export class AzureADStrategy extends PassportStrategy(BearerStrategy, 'azure-ad') {
  constructor(
    private readonly userService: UserService,
    @Inject('CACHE_MANAGER') private cacheManager: Cache,
  ) {
    super({ ...options, passReqToCallback: true });
  }

  makeCacheKey(email: string) {
    return `authguard.${email}.authguard`;
  }

  async handleFirstTimeUser(payload: AzureADPayload, reqToMakerEndpoint: boolean) {
    if (reqToMakerEndpoint) {
      const { emails, oid, iat, name } = payload;
      let { email, given_name: givenName, family_name: familyName } = payload;

      try {
        if (familyName) {
          if (!givenName && familyName.includes(',')) {
            givenName = familyName.split(',')[1];
            familyName = familyName.split(',')[0];
          }
        } else if (name) {
          if (name.includes(',')) {
            givenName = name.split(',')[1];
            familyName = name.split(',')[0];
          }
        }
        if (!givenName) givenName = 'New';
        if (!familyName) familyName = 'User';
      } catch {
        givenName = 'New';
        familyName = 'User';
      }

      if (!email) {
        email = emails[0];
      }

      const newUser = await this.userService.create(
        {
          loginEmail: email,
          firstName: givenName,
          lastName: familyName,
          externalOid: oid,
          SignInLogs: {
            create: {
              signInDateTime: new Date(iat * 1000),
            },
          },
        },
        {
          SignInLogs: {
            orderBy: { signInDateTime: 'desc' },
            take: 1,
          },
        },
      );
      return newUser;
    } else {
      // handle user was never exist and also skipping the get-current-user endpoint
      throw new ForbiddenException(
        'First time user need to use get-current-user endpoint to create user in the database.',
      );
    }
  }

  async handleSignInLogAndSession(payload: AzureADPayload, user: UserWithSignInLog, reqToMakerEndpoint: boolean) {
    if (
      new Date(payload.iat * 1000).getTime() > user.SignInLogs[0]?.signInDateTime.getTime() ||
      user.SignInLogs[0]?.signInDateTime.getTime() === undefined
    ) {
      // create sign in log for new iat detected
      if (reqToMakerEndpoint) {
        return await this.userService.createSignInLog({
          User: {
            connect: {
              id: user.id,
            },
          },
          signInDateTime: new Date(payload.iat * 1000),
        });
      }
    } else if (new Date(payload.iat * 1000).getTime() < user.SignInLogs[0]?.signInDateTime.getTime()) {
      if (!env.ALLOW_MULTI_SESSION) {
        throw new ForbiddenException('Multiple sessions not allowed');
      }
    }
  }

  async handleExistingUser(
    payload: AzureADPayload,
    user: UserWithSignInLog,
    req: Request,
    reqToMakerEndpoint: boolean,
  ) {
    const newSignInLog = await this.handleSignInLogAndSession(payload, user, reqToMakerEndpoint);

    // handle updates
    let doUpdate = false;
    const updatePayload: Prisma.UserUpdateInput = {};

    // update oid
    if (user.externalOid !== payload.oid) {
      updatePayload.externalOid = payload.oid;
      doUpdate = true;
    }

    // update user timezone info
    const timeZoneOffSet: string = req.headers['timezoneoffset'] as string;
    const timeZone: string = req.headers['timezone'] as string;
    if (timeZoneOffSet && timeZone && timeZone !== user.timeZone && timeZoneOffSet !== user.timeZoneOffSet) {
      updatePayload.timeZoneOffSet = timeZoneOffSet;
      updatePayload.timeZone = timeZone;
      doUpdate = true;
    }

    // apply change and return updated user
    if (doUpdate && reqToMakerEndpoint) {
      const updatedUser = await this.userService.update(user.id, updatePayload, {
        SignInLogs: { orderBy: { signInDateTime: 'desc' }, take: 1 },
      });
      user = updatedUser;
    }

    // clear user cache if new sign in log or user updated
    if (newSignInLog || doUpdate) {
      this.cacheManager.del(this.makeCacheKey(payload.email));
    }
    return user;
  }

  // request will pass in the user object from the AzureADGuard
  async validate(req: Request, payload: AzureADPayload) {
    const reqToMakerEndpoint = req.method === 'GET' && req.originalUrl.includes('current-user');
    payload.email = `${payload.emails[0]}`.toLowerCase();

    // get user from cache or db
    let user: UserWithSignInLog | undefined | null = await this.cacheManager.get(this.makeCacheKey(payload.email));
    // get user from db if not in cache
    if (!user) {
      user = await this.userService.findOneByEmail(payload.email, {
        SignInLogs: {
          orderBy: { signInDateTime: 'desc' },
          take: 1,
        },
      });
      // save user to cache for short period to reduce db read spikes
      await this.cacheManager.set(this.makeCacheKey(payload.email), user, 10000);
    } else {
    }

    if (!user) {
      // if user not in db, create user (only for get-current-user endpoint, it will cause async issues if used in multiple endpoints)
      return await this.handleFirstTimeUser(payload, reqToMakerEndpoint);
      // throw new ForbiddenException('User not invited');
      // return false;
    } else {
      // if user in db, update user
      return await this.handleExistingUser(payload, user, req, reqToMakerEndpoint);
    }
  }
}
