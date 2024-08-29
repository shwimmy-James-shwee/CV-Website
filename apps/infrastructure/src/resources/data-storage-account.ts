/*
This module contains the code for creating a data storage account in Azure.
It creates a storage account, storage blob, storage queue, and private endpoints for blob and queue services.
It also sets up diagnostic settings for the storage account and its services.

Important Note: The code currently only creates private endpoints for the blob and queue services.
If you need to create private endpoints for file and table services, you will need to modify the code accordingly.

Dependencies:
- pulumi
- pulumi_azure_native
- pulumi_azure_native.keyvault
- resources_base.diagnostic_setting_configs
- resources_base.codedeploy_identity
- resources_base.log_analytic_workspace
- resources_base.codedeploy_keyvault
- config
*/
import { insights, keyvault, network, storage } from '@pulumi/azure-native';
import { envBase } from '../env-base';
import { managedIdentity } from '../resources_base/codedeploy-identity';
import { logAnalyticsWorkspace } from '../resources_base/log-analytic-workspace';
import { dsSettings } from '../resources_base/diagnostic-setting-configs';

const dataStorageAccountName = `${envBase.PROJECT_NAME_ABBREVIATION}data${envBase.ENV}`;

const storageKey = new keyvault.Key(dataStorageAccountName, {
  keyName: `${dataStorageAccountName}-key`,
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  vaultName: envBase.KEYVAULT_NAME,
  properties: {
    kty: `RSA`
  }
});

export const dataStorage = new storage.StorageAccount(dataStorageAccountName, {
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  accountName: dataStorageAccountName,
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
      keyName: storageKey.name,
      keyVaultUri: `https://${envBase.KEYVAULT_NAME}.vault.azure.net`
    },
    encryptionIdentity: {
      encryptionUserAssignedIdentity: managedIdentity.then((v) => v.id)
    }
  }
});

const storageIgnoreList = [
  `tags`,
  `defaultEncryptionScope`,
  `denyEncryptionScopeOverride`,
  `publicAccess`,
  `etag`,
  `hasImmutabilityPolicy`,
  `hasLegalHold`,
  `lastModifiedTime`,
  `leaseState`,
  `leaseStatus`,
  `legalHold`,
  `remainingRetentionDays`
];
// create storage blob
export const dataBlobContainer = new storage.BlobContainer(
  `${dataStorageAccountName}-blob`,
  {
    accountName: dataStorage.name,
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    containerName: `${dataStorageAccountName}-blob`,
    publicAccess: storage.PublicAccess.None
  },
  {
    dependsOn: [dataStorage],
    // ITS policies will make the change to the resource directly with default policies.
    // Ignore those changes or the script might fail due to restricted actions.
    ignoreChanges: storageIgnoreList
  }
);

// configure blob service
new storage.BlobServiceProperties(`${dataStorageAccountName}-service`, {
  accountName: dataStorage.name.apply((v) => v),
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  blobServicesName: `default`,
  deleteRetentionPolicy: {
    allowPermanentDelete: false,
    days: 30,
    enabled: true
  },
  cors: {
    corsRules: []
  }
});

// create an general queue
export const dataQueue = new storage.Queue(
  `${dataStorageAccountName}-queue`,
  {
    accountName: dataStorage.name,
    queueName: `${dataStorageAccountName}-queue`,
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP
  },
  {
    ignoreChanges: storageIgnoreList,
    dependsOn: [dataStorage]
  }
);

// private endpoint for the storage account
const dataStoragePept = new network.PrivateEndpoint(
  `${dataStorageAccountName}-pept`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${dataStorageAccountName}-pept`,
    customNetworkInterfaceName: `${dataStorageAccountName}-pept-nic`,
    id: `${dataStorageAccountName}-pept`,
    customDnsConfigs: [],
    subnet: {
      id: envBase.PRIVATE_ENDPOINT_SUBNET
    },
    privateLinkServiceConnections: [
      {
        name: `${dataStorageAccountName}-plink`,
        privateLinkServiceId: dataStorage.id,
        groupIds: [`web`]
      }
    ]
  },
  {
    ignoreChanges: [`tags`, `privateLinkServiceConnections`]
  }
);

// data blob private endpoint
const dataBlobPept = new network.PrivateEndpoint(
  `${dataStorageAccountName}-blob-pept`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${dataStorageAccountName}-blob-pept`,
    customNetworkInterfaceName: `${dataStorageAccountName}-blob-pept-nic`,
    id: `${dataStorageAccountName}-blob-pept`,
    subnet: {
      id: envBase.PRIVATE_ENDPOINT_SUBNET
    },
    privateLinkServiceConnections: [
      {
        name: `${dataStorageAccountName}-blob-plink`,
        privateLinkServiceId: dataStorage.id,
        groupIds: [`blob`]
      }
    ]
  },
  {
    ignoreChanges: [`tags`, `privateLinkServiceConnections`]
  }
);

// data queue private endpoint
const dataQueuePept = new network.PrivateEndpoint(
  `${dataStorageAccountName}-queue-pept`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${dataStorageAccountName}-queue-pept`,
    customNetworkInterfaceName: `${dataStorageAccountName}-queue-pept-nic`,
    id: `${dataStorageAccountName}-queue-pept`,
    subnet: {
      id: envBase.PRIVATE_ENDPOINT_SUBNET
    },
    privateLinkServiceConnections: [
      {
        name: `${dataStorageAccountName}-queue-plink`,
        privateLinkServiceId: dataStorage.id,
        groupIds: [`queue`]
      }
    ]
  },
  {
    ignoreChanges: [`tags`, `privateLinkServiceConnections`]
  }
);

// diagnostic setting for the storage account pept
new insights.DiagnosticSetting(
  `${dataStorageAccountName}-pept-diagnostic`,
  {
    name: `${dataStorageAccountName}-pept-diagnostic`,
    resourceUri: dataStoragePept.networkInterfaces.apply((networkInterfaces) => {
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
    dependsOn: [dataStoragePept, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);

// diagnostic setting for the storage account blob pept
new insights.DiagnosticSetting(
  `${dataStorageAccountName}-blob-pept-diagnostic`,
  {
    name: `${dataStorageAccountName}-blob-pept-diagnostic`,
    resourceUri: dataBlobPept.networkInterfaces.apply((networkInterfaces) => {
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
    dependsOn: [dataBlobPept, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);

// diagnostic setting for the storage account queue pept
new insights.DiagnosticSetting(
  `${dataStorageAccountName}-queue-pept-diagnostic`,
  {
    name: `${dataStorageAccountName}-queue-pept-diagnostic`,
    resourceUri: dataQueuePept.networkInterfaces.apply((networkInterfaces) => {
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
    dependsOn: [dataQueuePept, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);

// diagnostic setting for the storage account, blob, file, table, and queue

new insights.DiagnosticSetting(
  `${dataStorageAccountName}-diagnostic`,
  {
    name: `${dataStorageAccountName}-diagnostic`,
    resourceUri: dataStorage.id,
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    metrics: dsSettings.storageDSMetricsItem
  },
  {
    dependsOn: [dataStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);
new insights.DiagnosticSetting(
  `${dataStorageAccountName}-blob-diagnostic`,
  {
    name: `${dataStorageAccountName}-blob-diagnostic`,
    resourceUri: dataStorage.id.apply((v) => `${v}/blobServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem
  },
  {
    dependsOn: [dataStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);
new insights.DiagnosticSetting(
  `${dataStorageAccountName}-file-diagnostic`,
  {
    name: `${dataStorageAccountName}-file-diagnostic`,
    resourceUri: dataStorage.id.apply((v) => `${v}/fileServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem
  },
  {
    dependsOn: [dataStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);
new insights.DiagnosticSetting(
  `${dataStorageAccountName}-table-diagnostic`,
  {
    name: `${dataStorageAccountName}-table-diagnostic`,
    resourceUri: dataStorage.id.apply((v) => `${v}/tableServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem
  },
  {
    dependsOn: [dataStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);

new insights.DiagnosticSetting(
  `${dataStorageAccountName}-queue-diagnostic`,
  {
    name: `${dataStorageAccountName}-queue-diagnostic`,
    resourceUri: dataStorage.id.apply((v) => `${v}/queueServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem
  },
  {
    dependsOn: [dataStorage, logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);

export const dataStorageKey = dataStorage.name
  .apply((name) => {
    return storage.listStorageAccountKeys({
      resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
      accountName: name
    });
  })
  .apply((keysRes) => {
    if (keysRes) {
      if (keysRes?.keys) {
        if (keysRes?.keys[0]) {
          if (keysRes?.keys[0]?.value) {
            return keysRes.keys[0].value;
          }
        }
      }
    }
    return ``;
  });

export const dataStorageConnectionString = dataStorageKey.apply((key) => {
  return `DefaultEndpointsProtocol=https;AccountName=${dataStorageAccountName};AccountKey=${key};EndpointSuffix=core.windows.net`;
});
