import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config();

const EnvSchema = z.object({
  PROJECT_NAME_ABBREVIATION: z.string(),
  ENV: z.string(),
  AZURE_RESOURCE_GROUP: z.string(),
  AZURE_RESOURCE_LOCATION: z.string(),
  ARM_TENANT_ID: z.string(),
  PRIVATE_ENDPOINT_SUBNET: z.string(),

  MANAGED_IDENTITY_NAME: z
    .string()
    .default(
      `${process.env.PROJECT_NAME_ABBREVIATION}-managed-identity-${process.env.ENV}`,
    ),
  KEYVAULT_NAME: z
    .string()
    .default(
      `${process.env.PROJECT_NAME_ABBREVIATION}-keyvault-${process.env.ENV}`,
    ),
  CODEDEPLOY_STORAGE_NAME: z
    .string()
    .default(
      `${process.env.PROJECT_NAME_ABBREVIATION}codedeploy${process.env.ENV}`,
    ),
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

export const envBase = validateEnvs();
