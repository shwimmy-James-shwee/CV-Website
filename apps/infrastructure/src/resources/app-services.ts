import { insights, keyvault, network, web } from '@pulumi/azure-native';
import { envBase } from '../env-base';
import { logAnalyticsWorkspace } from '../resources_base/log-analytic-workspace';
import { frontendUIStorage, frontendUrl } from './frontend-ui-storage';
import { appServicePlan } from '../resources_base/app-service-plan';
import { envExtend } from '../env-extend';
import { acrCredentials, containerRegistry } from '../resources_base/container-registry';
import { postgresConnectionString, postgresqlCluster } from './cosmosdb-postgres';
import { dsSettings } from '../resources_base/diagnostic-setting-configs';
import { vault } from '../resources_base/codedeploy-keyvault';
import { input } from '@pulumi/azure-native/types';

const webAppServiceName = `${envBase.PROJECT_NAME_ABBREVIATION}-be-${envBase.ENV}`;

const webappInsight = new insights.Component(
  `${webAppServiceName}-insight`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    location: envBase.AZURE_RESOURCE_LOCATION,
    resourceName: `${webAppServiceName}-insight`,
    applicationType: insights.ApplicationType.Web,
    kind: 'web',
    retentionInDays: 90,
    ingestionMode: insights.IngestionMode.LogAnalytics,
    workspaceResourceId: logAnalyticsWorkspace.id.apply((id) => id),
    flowType: insights.FlowType.Bluefield,
  },
  {
    dependsOn: [logAnalyticsWorkspace],
    ignoreChanges: ['tags'],
  },
);

const cors = [frontendUrl];
if (envBase.ENV == 'dev') {
  cors.push('http://localhost:3000');
}

const appSettings: input.web.NameValuePairArgs[] = [
  // unless needed, try use keyvault to store other secrets and configs, changing these will cause the app to restart
  // app service settings
  {
    name: 'APPINSIGHTS_INSTRUMENTATIONKEY',
    value: webappInsight.instrumentationKey.apply((key) => key),
  },
  {
    name: 'APPLICATIONINSIGHTS_CONNECTION_STRING',
    value: webappInsight.connectionString.apply((conn) => conn),
  },
  {
    name: 'ApplicationInsightsAgent_EXTENSION_VERSION',
    value: '~3',
  },
  {
    name: 'DiagnosticServices_EXTENSION_VERSION',
    value: '~3',
  },
  {
    name: 'InstrumentationEngine_EXTENSION_VERSION',
    value: 'disabled',
  },
  {
    name: 'XDT_MicrosoftApplicationInsights_BaseExtensions',
    value: 'disabled',
  },
  {
    name: 'XDT_MicrosoftApplicationInsights_Mode',
    value: 'recommended',
  },
  {
    name: 'XDT_MicrosoftApplicationInsights_PreemptSdk',
    value: 'disabled',
  },
  {
    name: 'WEBSITE_PULL_IMAGE_OVER_VNET',
    value: 'true',
  },
  // docker registry settings
  {
    name: 'DOCKER_REGISTRY_SERVER_URL',
    value: containerRegistry.loginServer.apply((server) => `https://${server}`),
  },
  {
    name: 'DOCKER_REGISTRY_SERVER_USERNAME',
    value: acrCredentials.apply((creds) => creds.username || ''),
  },
  {
    name: 'DOCKER_REGISTRY_SERVER_PASSWORD',
    value: acrCredentials.apply((creds) => {
      if (creds) {
        if (creds?.passwords) {
          if (creds?.passwords?.[0]) {
            if (creds.passwords?.[0].value) {
              return creds.passwords?.[0].value;
            }
          }
        }
      }
      return '';
    }),
  },
  // application settings
  {
    name: 'AZURE_KEY_VAULT_NAME',
    value: vault.then((resVault) => resVault.name),
  },
  {
    name: 'PORT',
    value: '80',
  },
  {
    name: 'APP_PORT',
    value: '80',
  },
  {
    name: 'WEBSITES_PORT',
    value: '80',
  },
  {
    name: 'DATABASE_URL',
    value: postgresConnectionString.apply((connectionString) => connectionString),
  },
  {
    name: 'DIRECT_URL',
    value: postgresConnectionString.apply((connectionString) => connectionString),
  },
  // B2C settings
  {
    name: 'B2C_CLIENT_ID',
    value: envExtend.B2C_CLIENT_ID,
  },
  {
    name: 'B2C_POLICY_NAME',
    value: envExtend.B2C_POLICY_NAME,
  },
  {
    name: 'B2C_TENANT_ID',
    value: envExtend.B2C_TENANT_ID,
  },
  {
    name: 'B2C_TENANT_NAME',
    value: envExtend.B2C_TENANT_NAME,
  },
  // unless needed, try use keyvault to store other secrets and configs, changing these will cause the app to restart
];
const restAPI = new web.WebApp(
  webAppServiceName,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    name: webAppServiceName,
    serverFarmId: appServicePlan.id.apply((id) => id),
    virtualNetworkSubnetId: envExtend.SERVICE_ENDPOINT_SUBNET,
    vnetRouteAllEnabled: true,
    clientCertEnabled: false,
    httpsOnly: true,
    identity: {
      type: web.ManagedServiceIdentityType.SystemAssigned,
    },
    siteConfig: {
      publicNetworkAccess: 'Disabled',
      ftpsState: web.FtpsState.FtpsOnly,
      alwaysOn: true,
      numberOfWorkers: 2,
      linuxFxVersion: 'DOCKER|nginx:latest',
      healthCheckPath: '/',
      cors: {
        allowedOrigins: cors,
        supportCredentials: true,
      },
      httpLoggingEnabled: true,
      logsDirectorySizeLimit: 35,
      appSettings: appSettings,
    },
  },
  {
    dependsOn: [webappInsight, containerRegistry, appServicePlan, frontendUIStorage, postgresqlCluster],
    ignoreChanges: ['tags', 'siteConfig.linuxFxVersion', 'siteConfig.healthCheckPath'],
    customTimeouts: {
      create: '30m',
      update: '30m',
      delete: '30m',
    },
  },
);

// app service will need access to keyvault

new keyvault.AccessPolicy(
  `${webAppServiceName}-access-policy`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
    policy: {
      objectId: restAPI.identity.apply((identity) => identity?.principalId || ''),
      tenantId: envBase.ARM_TENANT_ID,
      permissions: {
        keys: ['Decrypt', 'Get', 'List'],
        secrets: ['Get', 'List'],
      },
    },
  },
  {
    dependsOn: [restAPI],
    ignoreChanges: ['tags'],
  },
);

const restAPIPept = new network.PrivateEndpoint(
  `${webAppServiceName}-pept`,
  {
    id: `${webAppServiceName}-pept`,
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${webAppServiceName}-pept`,
    customNetworkInterfaceName: `${webAppServiceName}-pept-nic`,
    subnet: {
      id: envExtend.PRIVATE_ENDPOINT_SUBNET,
    },
    privateLinkServiceConnections: [
      {
        name: `${webAppServiceName}-plink`,
        privateLinkServiceId: restAPI.id.apply((id) => id),
        groupIds: ['sites'],
      },
    ],
  },
  {
    dependsOn: [restAPI],
    ignoreChanges: ['tags', 'privateLinkServiceConnections'],
  },
);

// diagnostic setting for the web app
new insights.DiagnosticSetting(
  `${webAppServiceName}-diagnostic-setting`,
  {
    name: `${webAppServiceName}-diagnostic-setting`,
    logs: dsSettings.webAppDSLogItem,
    metrics: dsSettings.webAppDSMetricsItem,
    resourceUri: restAPI.id.apply((id) => id),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
  },
  {
    dependsOn: [restAPI, logAnalyticsWorkspace],
  },
);

// diagnostic setting for the web app pept

new insights.DiagnosticSetting(
  `${webAppServiceName}-pept-diagnostic-setting`,
  {
    name: `${webAppServiceName}-pept-diagnostic-setting`,
    metrics: dsSettings.peptDSMetricsItem,
    resourceUri: restAPIPept.networkInterfaces.apply((networkInterfaces) => {
      if (networkInterfaces) {
        if (networkInterfaces[0]) {
          if (networkInterfaces[0]?.id) {
            return networkInterfaces[0].id;
          }
        }
      }
      return '';
    }),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
  },
  {
    dependsOn: [restAPIPept, logAnalyticsWorkspace],
  },
);

// webapp clone for staging
if (!['b1', 'b2', 'b3', 'f1'].includes(envExtend.pricingTier.toLowerCase()) && envExtend.addSlot) {
  const restAPIStaging = new web.WebAppSlot(
    `${webAppServiceName}-staging`,
    {
      resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
      name: restAPI.name.apply((name) => name),
      slot: 'staging',
      serverFarmId: appServicePlan.id.apply((id) => id),
      virtualNetworkSubnetId: envExtend.SERVICE_ENDPOINT_SUBNET,
      vnetRouteAllEnabled: true,
      clientCertEnabled: false,
      httpsOnly: true,
      identity: {
        type: web.ManagedServiceIdentityType.SystemAssigned,
      },
      siteConfig: {
        publicNetworkAccess: 'Disabled',
        ftpsState: web.FtpsState.FtpsOnly,
        alwaysOn: true,
        numberOfWorkers: 2,
        linuxFxVersion: 'DOCKER|nginx:latest',
        healthCheckPath: '/',
        cors: {
          allowedOrigins: cors,
          supportCredentials: true,
        },
        httpLoggingEnabled: true,
        logsDirectorySizeLimit: 35,
        appSettings: appSettings,
      },
    },
    {
      dependsOn: [webappInsight, containerRegistry, appServicePlan, frontendUIStorage, postgresqlCluster, restAPI],
      ignoreChanges: ['tags', 'siteConfig.linuxFxVersion', 'siteConfig.healthCheckPath'],
      customTimeouts: {
        create: '30m',
        update: '30m',
        delete: '30m',
      },
    },
  );

  new keyvault.AccessPolicy(
    `${webAppServiceName}-staging-access-policy`,
    {
      resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
      vaultName: envBase.KEYVAULT_NAME,
      policy: {
        objectId: restAPIStaging.identity.apply((identity) => identity?.principalId || ''),
        tenantId: envBase.ARM_TENANT_ID,
        permissions: {
          keys: ['Decrypt', 'Get', 'List'],
          secrets: ['Get', 'List'],
        },
      },
    },
    {
      dependsOn: [restAPIStaging],
      ignoreChanges: ['tags'],
    },
  );

  const restAPIStagingPept = new network.PrivateEndpoint(
    `${webAppServiceName}-staging-pept`,
    {
      id: `${webAppServiceName}-staging-pept`,
      resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
      privateEndpointName: `${webAppServiceName}-staging-pept`,
      customNetworkInterfaceName: `${webAppServiceName}-staging-pept-nic`,
      subnet: {
        id: envExtend.PRIVATE_ENDPOINT_SUBNET,
      },
      privateLinkServiceConnections: [
        {
          name: `${webAppServiceName}-staging-plink`,
          privateLinkServiceId: restAPI.id.apply((id) => id),
          groupIds: ['sites-staging'],
        },
      ],
    },
    {
      dependsOn: [restAPIStaging],
      ignoreChanges: ['tags', 'privateLinkServiceConnections'],
    },
  );
  // diagnostic setting for the web app
  new insights.DiagnosticSetting(
    `${webAppServiceName}-staging-diagnostic-setting`,
    {
      name: `${webAppServiceName}-staging-diagnostic-setting`,
      // staging doesnt like app service authentication logs
      logs: dsSettings.webAppDSLogItem.filter((item) => item.category !== 'AppServiceAuthenticationLogs'),
      metrics: dsSettings.webAppDSMetricsItem,
      resourceUri: restAPIStaging.id.apply((id) => id),
      workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    },
    {
      dependsOn: [restAPIStaging, logAnalyticsWorkspace],
    },
  );

  // diagnostic setting for the web app pept

  new insights.DiagnosticSetting(
    `${webAppServiceName}-staging-pept-diagnostic-setting`,
    {
      name: `${webAppServiceName}-staging-pept-diagnostic-setting`,
      metrics: dsSettings.peptDSMetricsItem,
      resourceUri: restAPIStagingPept.networkInterfaces.apply((networkInterfaces) => {
        if (networkInterfaces) {
          if (networkInterfaces[0]) {
            if (networkInterfaces[0]?.id) {
              return networkInterfaces[0].id;
            }
          }
        }
        return '';
      }),
      workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    },
    {
      dependsOn: [restAPIStagingPept, logAnalyticsWorkspace],
    },
  );
}
