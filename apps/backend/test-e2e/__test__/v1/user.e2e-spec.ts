import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../../../src/api/v1/user/user.module';
import { AzureADGuard } from '../../../src/guard/auth/azuread.guard';
import { adminAdUser } from '../../__data__/user.data';
import { MemberRole, User, UserRole } from '@prisma/client';
import { APIReturnObjectify, seedBusinessUnit, seedMember, seedUser } from '../../utils';
import { DatabaseService } from '../../../src/database/database.service';
import { ROUTE } from '../../../src/shared/endpoints';

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let prisma: DatabaseService;
  let guard: AzureADGuard;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideGuard(AzureADGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          request.user = { ...adminAdUser, roles: [UserRole.ADMINISTRATOR] } as User;
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    guard = app.get<AzureADGuard>(AzureADGuard);
    prisma = app.get<DatabaseService>(DatabaseService);
    await app.init();
  });

  afterEach(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('/current-user (GET)', () => {
    return request(app.getHttpServer())
      .get(ROUTE.user.base + ROUTE.user.currentUser)
      .expect(200)
      .expect(
        APIReturnObjectify({
          ...adminAdUser,
          roles: [UserRole.ADMINISTRATOR],
          InBusinessUnits: [],
        }),
      );
  });

  it('/admin-users (GET) - 400', () => {
    return request(app.getHttpServer())
      .get(ROUTE.user.base + ROUTE.user.adminUsers + 'id')
      .expect(400);
  });

  it('/admin-users (GET) - 200', async () => {
    guard.canActivate = (context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      request.user = seedUser as User;
      return true;
    };

    await prisma.member.update({
      where: {
        id: seedMember.id,
      },
      data: {
        roles: [MemberRole.ADMINISTRATOR],
      },
    });
    const { status, body } = await request(app.getHttpServer()).get(
      ROUTE.user.base + ROUTE.user.adminUsers + seedBusinessUnit.id,
    );

    expect(status).toBe(200);
    expect(body).toMatchObject([{ id: seedUser.id, firstName: seedUser.firstName, lastName: seedUser.lastName }]);
  });
});
