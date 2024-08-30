import { passportConfig } from './auth-config';

describe('passportConfig', () => {
  it('should return the correct passportConfig', () => {
    expect(passportConfig).toEqual({
      credentials: {
        tenantName: 'placeholder.onmicrosoft.com',
        clientID: 'placeholder'
      },
      policies: {
        policyName: 'placeholder'
      },
      metadata: {
        b2cDomain: 'placeholder.b2clogin.com',
        authority: 'login.microsoftonline.com',
        discovery: '.well-known/openid-configuration',
        version: 'v2.0'
      },
      settings: {
        isB2C: true,
        validateIssuer: false,
        passReqToCallback: true,
        loggingLevel: 'info',
        loggingNoPII: false
      },
      protectedRoutes: {
        api: {
          endpoint: '/api',
          delegatedPermissions: {
            read: ['Client.Read', 'Internal.Read'],
            write: ['Client.Write', 'Internal.Write']
          }
        }
      }
    });
  });
});
