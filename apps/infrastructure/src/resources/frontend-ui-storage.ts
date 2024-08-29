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

const frontendUIStorageName = `${envBase.PROJECT_NAME_ABBREVIATION}fe${envBase.ENV}`;

const frontendKey = new keyvault.Key(frontendUIStorageName, {
  keyName: `${frontendUIStorageName}-key`,
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  vaultName: envBase.KEYVAULT_NAME,
  properties: {
    kty: `RSA`
  }
});

export const frontendUIStorage = new storage.StorageAccount(
  frontendUIStorageName,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    accountName: frontendUIStorageName,
    sku: {
      name: storage.SkuName.Standard_GRS
    },
    kind: storage.Kind.StorageV2,
    accessTier: storage.AccessTier.Hot,
    enableHttpsTrafficOnly: true,
    minimumTlsVersion: storage.MinimumTlsVersion.TLS1_2,
    allowBlobPublicAccess: true,
    networkRuleSet: {
      defaultAction: storage.DefaultAction.Deny,
      bypass: storage.Bypass.AzureServices
    },
    identity: {
      type: storage.IdentityType.UserAssigned,
      userAssignedIdentities: [managedIdentity.then((v) => v.id)]
    },
    encryption: {
      keySource: storage.KeySource.Microsoft_Keyvault,
      services: {
        blob: { enabled: true },
        file: { enabled: true },
        table: {
          keyType: storage.KeyType.Account,
          enabled: true
        },
        queue: {
          keyType: storage.KeyType.Account,
          enabled: true
        }
      },
      requireInfrastructureEncryption: true,
      keyVaultProperties: {
        keyName: frontendKey.name,
        keyVaultUri: `https://${envBase.KEYVAULT_NAME}.vault.azure.net`
      },
      encryptionIdentity: {
        encryptionUserAssignedIdentity: managedIdentity.then((v) => v.id)
      }
    }
  },
  {
    ignoreChanges: [`tags`]
  }
);

// Create a static website for the storage account
new storage.StorageAccountStaticWebsite(
  `${frontendUIStorageName}-staticWebsite`,

  {
    accountName: frontendUIStorage.name,
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    indexDocument: `index.html`,
    error404Document: `index.html`
  },
  {
    ignoreChanges: [`tags`]
  }
);

// private endpoint for the storage account
const frontendUIPept = new network.PrivateEndpoint(
  `${frontendUIStorageName}-pept`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${frontendUIStorageName}-pept`,
    customNetworkInterfaceName: `${frontendUIStorageName}-pept-nic`,
    id: `${frontendUIStorageName}-pept`,
    customDnsConfigs: [],
    subnet: {
      id: envBase.PRIVATE_ENDPOINT_SUBNET
    },
    privateLinkServiceConnections: [
      {
        name: `${frontendUIStorageName}-plink`,
        privateLinkServiceId: frontendUIStorage.id,
        groupIds: [`web`]
      }
    ]
  },
  {
    ignoreChanges: [`tags`, `privateLinkServiceConnections`]
  }
);

// frontend blob private endpoint
const frontendUIBlobPept = new network.PrivateEndpoint(
  `${frontendUIStorageName}-blob-pept`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${frontendUIStorageName}-blob-pept`,
    customNetworkInterfaceName: `${frontendUIStorageName}-blob-pept-nic`,
    id: `${frontendUIStorageName}-blob-pept`,
    subnet: {
      id: envBase.PRIVATE_ENDPOINT_SUBNET
    },
    privateLinkServiceConnections: [
      {
        name: `${frontendUIStorageName}-blob-plink`,
        privateLinkServiceId: frontendUIStorage.id,
        groupIds: [`blob`]
      }
    ]
  },
  {
    ignoreChanges: [`tags`, `privateLinkServiceConnections`]
  }
);

// diagnostic setting for the storage account pept
new insights.DiagnosticSetting(
  `${frontendUIStorageName}-pept-diagnostic`,
  {
    name: `${frontendUIStorageName}-pept-diagnostic`,
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
    metrics: dsSettings.peptDSMetricsItem
  },
  {
    dependsOn: [frontendUIPept, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);

// diagnostic setting for the storage account blob pept
new insights.DiagnosticSetting(
  `${frontendUIStorageName}-blob-pept-diagnostic`,
  {
    name: `${frontendUIStorageName}-blob-pept-diagnostic`,
    resourceUri: frontendUIBlobPept.networkInterfaces.apply((networkInterfaces) => {
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
    metrics: dsSettings.peptDSMetricsItem
  },
  {
    dependsOn: [frontendUIBlobPept, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);

// diagnostic setting for the storage account, blob, file, table, and queue

new insights.DiagnosticSetting(
  `${frontendUIStorageName}-diagnostic`,
  {
    name: `${frontendUIStorageName}-diagnostic`,
    resourceUri: frontendUIStorage.id,
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    metrics: dsSettings.storageDSMetricsItem
  },
  {
    dependsOn: [frontendUIStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);
new insights.DiagnosticSetting(
  `${frontendUIStorageName}-blob-diagnostic`,
  {
    name: `${frontendUIStorageName}-blob-diagnostic`,
    resourceUri: frontendUIStorage.id.apply((v) => `${v}/blobServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem
  },
  {
    dependsOn: [frontendUIStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);
new insights.DiagnosticSetting(
  `${frontendUIStorageName}-file-diagnostic`,
  {
    name: `${frontendUIStorageName}-file-diagnostic`,
    resourceUri: frontendUIStorage.id.apply((v) => `${v}/fileServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem
  },
  {
    dependsOn: [frontendUIStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);
new insights.DiagnosticSetting(
  `${frontendUIStorageName}-table-diagnostic`,
  {
    name: `${frontendUIStorageName}-table-diagnostic`,
    resourceUri: frontendUIStorage.id.apply((v) => `${v}/tableServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem
  },
  {
    dependsOn: [frontendUIStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);

new insights.DiagnosticSetting(
  `${frontendUIStorageName}-queue-diagnostic`,
  {
    name: `${frontendUIStorageName}-queue-diagnostic`,
    resourceUri: frontendUIStorage.id.apply((v) => `${v}/queueServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem
  },
  {
    dependsOn: [frontendUIStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);

export const frontendUrl = `https://${frontendUIStorageName}.z8.web.core.windows.net`;
