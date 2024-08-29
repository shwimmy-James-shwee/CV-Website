import { insights, keyvault, network, web } from "@pulumi/azure-native";
import { envBase } from "../env-base";
import { logAnalyticsWorkspace } from "../resources_base/log-analytic-workspace";
import { appServicePlan } from "../resources_base/app-service-plan";
import { envExtend } from "../env-extend";
import { dataBlobContainer, dataQueue, dataStorage, dataStorageConnectionString } from "./data-storage-account";
import { dsSettings } from "../resources_base/diagnostic-setting-configs";
import { postgresConnectionString } from "./cosmosdb-postgres";
import { frontendUrls } from "./frontend-ui-storage";

const functionAppServiceName = `${envBase.PROJECT_NAME_ABBREVIATION}-fa-${envBase.ENV}`;

const functionAppInsight = new insights.Component(
  `${functionAppServiceName}-insight`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    location: envBase.AZURE_RESOURCE_LOCATION,
    resourceName: `${functionAppServiceName}-insight`,
    applicationType: insights.ApplicationType.Web,
    kind: `web`,
    retentionInDays: 90,
    ingestionMode: insights.IngestionMode.LogAnalytics,
    workspaceResourceId: logAnalyticsWorkspace.id.apply((id) => id),
    flowType: insights.FlowType.Bluefield
  },
  {
    dependsOn: [logAnalyticsWorkspace],
    ignoreChanges: [`tags`]
  }
);

const functionApp = new web.WebApp(
  functionAppServiceName,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    location: envBase.AZURE_RESOURCE_LOCATION,
    name: functionAppServiceName,
    serverFarmId: appServicePlan.id.apply((id) => id),
    virtualNetworkSubnetId: envExtend.SERVICE_ENDPOINT_SUBNET,
    vnetRouteAllEnabled: true,
    clientCertEnabled: false,
    enabled: true,
    kind: `functionapp,linux`,
    httpsOnly: true,
    identity: {
      type: web.ManagedServiceIdentityType.SystemAssigned
    },
    keyVaultReferenceIdentity: web.ManagedServiceIdentityType.SystemAssigned,
    tags: {
      "hidden-link: /app-insights-resource-id": functionAppInsight.id.apply((id) => id)
    },
    siteConfig: {
      publicNetworkAccess: `Disabled`,
      nodeVersion: `~20`,
      ftpsState: web.FtpsState.FtpsOnly,
      alwaysOn: true,
      numberOfWorkers: 1,
      linuxFxVersion: `Node|20`,

      appSettings: [
        {
          name: `runtime`,
          value: `node`
        },
        {
          name: `FUNCTIONS_WORKER_RUNTIME`,
          value: `node`
        },
        {
          name: `AzureWebJobsFeatureFlags`,
          value: `EnableWorkerIndexing`
        },
        {
          name: `FUNCTIONS_EXTENSION_VERSION`,
          value: `~4`
        },
        {
          name: `AzureWebJobsStorage`,
          value: dataStorageConnectionString.apply((connectionString) => connectionString)
        },
        {
          name: `CLOUD_ENV`,
          value: envBase.ENV
        },
        {
          name: `STORAGE_BLOB_NAME`,
          value: dataBlobContainer.name.apply((name) => name)
        },
        {
          name: `QUEUE_NAME`,
          value: dataQueue.name.apply((name) => name)
        },
        {
          name: `DATABASE_URL`,
          value: postgresConnectionString.apply((connectionString) => connectionString)
        },
        {
          name: `FRONTEND_URL`,
          value: frontendUrls[0]
        },
        {
          name: `AZURE_KEY_VAULT_NAME`,
          value: envBase.KEYVAULT_NAME
        },
        {
          name: `SENDGRID_KEY`,
          value: `${envExtend.SENDGRID_KEY}`
        },
        // config for the function app
        {
          name: `APPINSIGHTS_INSTRUMENTATIONKEY`,
          value: functionAppInsight.instrumentationKey.apply((key) => key)
        },
        {
          name: `APPLICATIONINSIGHTS_CONNECTION_STRING`,
          value: functionAppInsight.connectionString.apply((connectionString) => connectionString)
        },
        {
          name: `ApplicationInsightsAgent_EXTENSION_VERSION`,
          value: `~3`
        },
        {
          name: `ENABLE_ORYX_BUILD`,
          value: `false`
        },
        {
          name: `SCM_DO_BUILD_DURING_DEPLOYMENT`,
          value: `false`
        },
        {
          name: `WEBSITE_RUN_FROM_PACKAGE`,
          value: `1`
        }
      ]
    }
  },
  {
    dependsOn: [functionAppInsight, appServicePlan, dataStorage],
    ignoreChanges: [`tags`]
  }
);

new keyvault.AccessPolicy(
  `${functionAppServiceName}-access-policy`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
    policy: {
      objectId: functionApp.identity.apply((identity) => identity?.principalId || ``),
      tenantId: envBase.ARM_TENANT_ID,
      permissions: {
        keys: [`Decrypt`, `Get`, `List`],
        secrets: [`Get`, `List`, `Set`]
      }
    }
  },
  {
    dependsOn: [functionApp],
    ignoreChanges: [`tags`]
  }
);

const functionAppPept = new network.PrivateEndpoint(
  `${functionAppServiceName}-pept`,
  {
    id: `${functionAppServiceName}-pept`,
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${functionAppServiceName}-pept`,
    customNetworkInterfaceName: `${functionAppServiceName}-pept-nic`,
    subnet: {
      id: envExtend.PRIVATE_ENDPOINT_SUBNET
    },
    privateLinkServiceConnections: [
      {
        name: `${functionAppServiceName}-plink`,
        privateLinkServiceId: functionApp.id.apply((id) => id),
        groupIds: [`sites`]
      }
    ]
  },
  {
    ignoreChanges: [`tags`, `privateLinkServiceConnections`],
    dependsOn: [functionApp]
  }
);

// diagnostic settings for the function app

new insights.DiagnosticSetting(
  `${functionAppServiceName}-diagnostic-setting`,
  {
    name: `${functionAppServiceName}-diagnostic-setting`,
    logs: dsSettings.functionAppDSLogItem,
    metrics: dsSettings.functionAppDSMetricsItem,
    resourceUri: functionApp.id.apply((id) => id),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id)
  },
  {
    dependsOn: [functionApp, logAnalyticsWorkspace]
  }
);

// diagnostic setting for the function app pept

new insights.DiagnosticSetting(
  `${functionAppServiceName}-pept-diagnostic-setting`,
  {
    name: `${functionAppServiceName}-pept-diagnostic-setting`,
    metrics: dsSettings.peptDSMetricsItem,
    resourceUri: functionAppPept.networkInterfaces.apply((networkInterfaces) => {
      if (networkInterfaces) {
        if (networkInterfaces[0]) {
          if (networkInterfaces[0]?.id) {
            return networkInterfaces[0].id;
          }
        }
      }
      return ``;
    }),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id)
  },
  {
    dependsOn: [functionApp, logAnalyticsWorkspace]
  }
);
