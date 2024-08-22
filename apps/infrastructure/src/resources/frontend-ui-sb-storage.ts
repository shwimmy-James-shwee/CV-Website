/*
This script deploys a storage account for the frontend UI of a web application.
It creates a storage account with user-assigned managed identity and enables static website support.
It also creates private endpoints for the storage account and sets up diagnostic settings for monitoring.
*/

import { insights, keyvault, network, storage } from '@pulumi/azure-native';
import { envBase } from '../env-base';
import { managedIdentity } from '../resources_base/codedeploy-identity';
import { logAnalyticsWorkspace } from '../resources_base/log-analytic-workspace';
import { dsSettings } from '../resources_base/diagnostic-setting-configs';

const frontendUISBStorageName = `${envBase.PROJECT_NAME_ABBREVIATION}sbfe${envBase.ENV}`;

const frontendKey = new keyvault.Key(frontendUISBStorageName, {
  keyName: `${frontendUISBStorageName}-key`,
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  vaultName: envBase.KEYVAULT_NAME,
  properties: {
    kty: `RSA`,
  },
});

export const frontendUISBStorage = new storage.StorageAccount(
  frontendUISBStorageName,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    accountName: frontendUISBStorageName,
    sku: {
      name: storage.SkuName.Standard_GRS,
    },
    kind: storage.Kind.StorageV2,
    accessTier: storage.AccessTier.Hot,
    enableHttpsTrafficOnly: true,
    minimumTlsVersion: storage.MinimumTlsVersion.TLS1_2,
    allowBlobPublicAccess: true,
    networkRuleSet: {
      defaultAction: storage.DefaultAction.Deny,
      bypass: storage.Bypass.AzureServices,
    },
    identity: {
      type: storage.IdentityType.UserAssigned,
      userAssignedIdentities: [managedIdentity.then((v) => v.id)],
    },
    encryption: {
      keySource: storage.KeySource.Microsoft_Keyvault,
      services: {
        blob: { enabled: true },
        file: { enabled: true },
        table: {
          keyType: storage.KeyType.Account,
          enabled: true,
        },
        queue: {
          keyType: storage.KeyType.Account,
          enabled: true,
        },
      },
      requireInfrastructureEncryption: true,
      keyVaultProperties: {
        keyName: frontendKey.name,
        keyVaultUri: `https://${envBase.KEYVAULT_NAME}.vault.azure.net`,
      },
      encryptionIdentity: {
        encryptionUserAssignedIdentity: managedIdentity.then((v) => v.id),
      },
    },
  },
  {
    ignoreChanges: [`tags`],
  },
);

// Create a static website for the storage account
new storage.StorageAccountStaticWebsite(
  `${frontendUISBStorageName}-staticWebsite`,
  {
    accountName: frontendUISBStorage.name,
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    indexDocument: `index.html`,
    error404Document: `index.html`,
  },
  {
    ignoreChanges: [`tags`],
  },
);

// private endpoint for the storage account
const frontendUIPept = new network.PrivateEndpoint(
  `${frontendUISBStorageName}-pept`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${frontendUISBStorageName}-pept`,
    customNetworkInterfaceName: `${frontendUISBStorageName}-pept-nic`,
    id: `${frontendUISBStorageName}-pept`,
    customDnsConfigs: [],
    subnet: {
      id: envBase.PRIVATE_ENDPOINT_SUBNET,
    },
    privateLinkServiceConnections: [
      {
        name: `${frontendUISBStorageName}-plink`,
        privateLinkServiceId: frontendUISBStorage.id,
        groupIds: [`web`],
      },
    ],
  },
  {
    ignoreChanges: [`tags`, `privateLinkServiceConnections`],
  },
);

// frontend blob private endpoint
const frontendUIBlobPept = new network.PrivateEndpoint(
  `${frontendUISBStorageName}-blob-pept`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${frontendUISBStorageName}-blob-pept`,
    customNetworkInterfaceName: `${frontendUISBStorageName}-blob-pept-nic`,
    id: `${frontendUISBStorageName}-blob-pept`,
    subnet: {
      id: envBase.PRIVATE_ENDPOINT_SUBNET,
    },
    privateLinkServiceConnections: [
      {
        name: `${frontendUISBStorageName}-blob-plink`,
        privateLinkServiceId: frontendUISBStorage.id,
        groupIds: [`blob`],
      },
    ],
  },
  {
    ignoreChanges: [`tags`, `privateLinkServiceConnections`],
  },
);

// diagnostic setting for the storage account pept
new insights.DiagnosticSetting(
  `${frontendUISBStorageName}-pept-diagnostic`,
  {
    name: `${frontendUISBStorageName}-pept-diagnostic`,
    resourceUri: frontendUIPept.networkInterfaces.apply((networkInterfaces) => {
      if (networkInterfaces) {
        if (networkInterfaces[0]) {
          if (networkInterfaces[0]?.id) {
            return networkInterfaces[0].id;
          }
        }
      }
      return ``;
    }),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    metrics: dsSettings.peptDSMetricsItem,
  },
  {
    dependsOn: [frontendUIPept, logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);

// diagnostic setting for the storage account blob pept
new insights.DiagnosticSetting(
  `${frontendUISBStorageName}-blob-pept-diagnostic`,
  {
    name: `${frontendUISBStorageName}-blob-pept-diagnostic`,
    resourceUri: frontendUIBlobPept.networkInterfaces.apply(
      (networkInterfaces) => {
        if (networkInterfaces) {
          if (networkInterfaces[0]) {
            if (networkInterfaces[0]?.id) {
              return networkInterfaces[0].id;
            }
          }
        }
        return ``;
      },
    ),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    metrics: dsSettings.peptDSMetricsItem,
  },
  {
    dependsOn: [frontendUIBlobPept, logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);

// diagnostic setting for the storage account, blob, file, table, and queue

new insights.DiagnosticSetting(
  `${frontendUISBStorageName}-diagnostic`,
  {
    name: `${frontendUISBStorageName}-diagnostic`,
    resourceUri: frontendUISBStorage.id,
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    metrics: dsSettings.storageDSMetricsItem,
  },
  {
    dependsOn: [frontendUISBStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);
new insights.DiagnosticSetting(
  `${frontendUISBStorageName}-blob-diagnostic`,
  {
    name: `${frontendUISBStorageName}-blob-diagnostic`,
    resourceUri: frontendUISBStorage.id.apply(
      (v) => `${v}/blobServices/default`,
    ),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem,
  },
  {
    dependsOn: [frontendUISBStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);
new insights.DiagnosticSetting(
  `${frontendUISBStorageName}-file-diagnostic`,
  {
    name: `${frontendUISBStorageName}-file-diagnostic`,
    resourceUri: frontendUISBStorage.id.apply(
      (v) => `${v}/fileServices/default`,
    ),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem,
  },
  {
    dependsOn: [frontendUISBStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);
new insights.DiagnosticSetting(
  `${frontendUISBStorageName}-table-diagnostic`,
  {
    name: `${frontendUISBStorageName}-table-diagnostic`,
    resourceUri: frontendUISBStorage.id.apply(
      (v) => `${v}/tableServices/default`,
    ),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem,
  },
  {
    dependsOn: [frontendUISBStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);

new insights.DiagnosticSetting(
  `${frontendUISBStorageName}-queue-diagnostic`,
  {
    name: `${frontendUISBStorageName}-queue-diagnostic`,
    resourceUri: frontendUISBStorage.id.apply(
      (v) => `${v}/queueServices/default`,
    ),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem,
  },
  {
    dependsOn: [frontendUISBStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);
