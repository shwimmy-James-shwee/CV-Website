import { env } from './env';

export const passportConfig = {
  credentials: {
    tenantName: `${env.B2C_TENANT_NAME}.onmicrosoft.com`,
    clientID: `${env.B2C_CLIENT_ID}`,
  },
  policies: {
    policyName: `${env.B2C_POLICY_NAME}`,
  },
  metadata: {
    b2cDomain: `${env.B2C_TENANT_NAME}.b2clogin.com`,
    authority: 'login.microsoftonline.com',
    discovery: '.well-known/openid-configuration',
    version: 'v2.0',
  },
  settings: {
    isB2C: true,
    validateIssuer: false,
    passReqToCallback: true,
    loggingLevel: 'info',
    loggingNoPII: false,
  },
  protectedRoutes: {
    api: {
      endpoint: '/api',
      delegatedPermissions: {
        read: ['Client.Read', 'Internal.Read'],
        write: ['Client.Write', 'Internal.Write'],
      },
    },
  },
};
