import { env, validateEnvs } from './env';

describe('env', () => {
  it('should be defined', () => {
    expect(env).toBeDefined();
  });

  it('should have default values', () => {
    expect(env.NODE_ENV).toEqual('test');
    expect(env.PORT).toEqual('8080');
    expect(env.APPLICATIONINSIGHTS_CONNECTION_STRING).toEqual('placeholder');
    expect(env.DATABASE_URL).toEqual('postgresql://postgres:postgres@127.0.0.1:5432/postgres?schema=tpltest');
    expect(env.B2C_TENANT_ID).toEqual('placeholder');
    expect(env.B2C_API_APP_ID).toEqual('placeholder');
    expect(env.B2C_API_APP_SECRET).toEqual('placeholder');
    expect(env.B2C_CLIENT_ID).toEqual('placeholder');
    expect(env.B2C_TENANT_NAME).toEqual('placeholder');
    expect(env.B2C_POLICY_NAME).toEqual('placeholder');
    expect(env.TEMP_UPLOAD_DIR).toEqual('/tmp');
    expect(env.ALLOW_MULTI_SESSION).toEqual(false);
    expect(env.FRONTEND_URL).toEqual('https://tplv1fedev.z8.web.core.windows.net/');
  });
  it('should throw an error if environment variables are invalid', () => {
    // Mocking an invalid environment variable
    process.env['PORT'] = 'invalid';

    expect(() => {
      validateEnvs();
    }).toThrow();
  });
});
