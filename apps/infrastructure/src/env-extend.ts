/*
This module contains the configuration settings for the web application infrastructure-as-code.

It imports necessary modules and retrieves configuration values from environment variables and pulumi config.

Attributes:
    project_abbr (str): The abbreviation of the project name used as a resource prefix when deployed.
    mainParams (dict): The main parameters required for the infrastructure.
    webappParams (dict): The parameters specific to the web application.
    dbParams (dict): The parameters specific to the database.
    containerParams (dict): The parameters specific to the container.
    resourceGroup (str): The Azure resource group.
    location (str): The location for the resources.
    av_cpu (str): The processing power Antivirus can use.
    av_memory (str): How much memory Antivirus can use.
    pricing_tier (str): The pricing tier for the web application.
    min_capacity (str): The minimum capacity for the web application.
    max_capacity (str): The maximum capacity for the web application.
    tenant_id (str): The Azure Active Directory tenant ID.
    environment (str): The environment in which the infrastructure is deployed.
    log_retention_days (str): The number of days to retain logs.
    privateEndpointSubnet (str): The subnet for private endpoints.
    serviceEndpointSubnet (str): The subnet for service endpoints.
    postgresAdminPassword (str): The admin password for the PostgreSQL database.
    enable_alerts (bool): Flag indicating whether alerts should be enabled.
    create_alert_resources (bool): Flag indicating whether alert resources should be created.
*/
import { z } from 'zod';
import { Config } from '@pulumi/pulumi/config';
import { envBase } from './env-base';
import * as dotenv from 'dotenv';
dotenv.config();

const conf = new Config();

interface MainParams {
  logRetentionDays: number;
}
interface WebappParams {
  pricingTier: string;
  maxCapacity: string;
  minCapacity: string;
  addSlot: boolean;
}
interface DbParams {
  coordinatorServerEdition: string;
  coordinatorStorageQuotaInMb: number;
  coordinatorVcoreCount: number;
  haEnabled: boolean;
  nodeCount: number;
  nodeStorageQuotaInMb: number;
  nodeVcores: number;
  shardsOnCoordinatorEnabled: boolean;
}
interface ContainerParams {
  avCPU: string;
  avMemory: string;
}

const mainParams = conf.requireObject<MainParams>('mainParams');
const webappParams = conf.requireObject<WebappParams>('webappParams');
const dbParams = conf.requireObject<DbParams>('dbParams');
const containerParams = conf.requireObject<ContainerParams>('containerParams');

const EnvSchema = z.object({
  SENDGRID_KEY: z.string().default('placeholder'),
  PRIVATE_ENDPOINT_SUBNET: z.string().default(envBase.PRIVATE_ENDPOINT_SUBNET),
  SERVICE_ENDPOINT_SUBNET: z.string(),
  ACI_SERVICE_ENDPOINT_SUBNET: z.string().default('placeholder'),

  POSTGRES_ADMIN_PASSWORD: z.string(),
  ENABLE_ALERTS: z.boolean().default(envBase.ENV == 'prd'),
  CREATE_ALERT_RESOURCES: z.boolean().default(envBase.ENV == 'prd'),

  B2C_TENANT_ID: z.string().default('placeholder'),
  B2C_TENANT_NAME: z.string().default('placeholder'),
  B2C_CLIENT_ID: z.string().default('placeholder'),
  B2C_POLICY_NAME: z.string().default('placeholder'),

  FRONTEND_URL: z.string().default('placeholder'),
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

export const envExtend = {
  ...validateEnvs(),
  ...mainParams,
  usingBasicAppPlan: ['b1', 'b2', 'b3', 'f1'].includes(webappParams.pricingTier.toLowerCase()),
  ...webappParams,
  ...containerParams,
  ...dbParams,
};
