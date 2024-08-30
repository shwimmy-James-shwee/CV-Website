import { z } from 'zod';
import * as dotenv from 'dotenv';
process.env.NODE_ENV === 'test' ? dotenv.config({ path: './.env.test' }) : dotenv.config();

const EnvSchema = z.object({
  // application-level
  NODE_ENV: z
    .enum(['local', 'test', 'development', 'production'], {
      description: 'Please specify the NODE_ENV values ONLY using the ones specified in the array'
    })
    .default('production'),
  PORT: z
    .string()
    .refine((v) => parseInt(v))
    .default('8080'),

  // logging
  APPLICATIONINSIGHTS_CONNECTION_STRING: z.string().optional().default('placeholder'),

  // Infrastructure-level
  DATABASE_URL: z.string().optional().default('placeholder'),

  // B2C
  B2C_TENANT_ID: z.string().default('placeholder'),
  B2C_API_APP_ID: z.string().default('placeholder'),
  B2C_API_APP_SECRET: z.string().default('placeholder'),
  B2C_CLIENT_ID: z.string().default('placeholder'),
  B2C_TENANT_NAME: z.string().default('placeholder'),
  B2C_POLICY_NAME: z.string().default('placeholder'),

  // File upload directory
  AZURE_STORAGE_ACCOUNT: z.string().default('placeholder'),
  AZURE_STORAGE_KEY: z.string().default('placeholder'),
  AZURE_CONTAINER_NAME: z.string().default('placeholder'),
  AV_HOST: z.string().default('placeholder'),
  AV_PORT: z.string().default('3310'),

  TEMP_UPLOAD_DIR: z.string().default('/tmp'),

  // enable multi-session
  ALLOW_MULTI_SESSION: z.boolean().default(false),

  // FE
  FRONTEND_URL: z.string().default('https://tplv1fedev.z8.web.core.windows.net/'),

  // Email
  SERVICE_EMAIL: z.string().default('no-reply@kpmgservices.co.nz'),
  EMAIL_QUEUE_NAME: z.string().default('placeholder')
});
export type Env = z.infer<typeof EnvSchema>;

export const validateEnvs = (): Env => {
  const parsed = EnvSchema.safeParse(process.env);
  if (parsed.success === false) {
    throw parsed.error;
  } else {
    return parsed.data;
  }
};

export const env = validateEnvs();
