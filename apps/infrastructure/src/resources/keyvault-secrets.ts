/**
 *Creates secret in the Azure Key Vault.
 *
 *Try to keep generate  secret creation here only. If you need to create secret for a specific resource, *then create it in
 *the resource file.
 *
 *eg. If you need to create a secret for a Postgres Connection String, then create it in the *cosmosdb_postgres.py file.
 */

import { keyvault } from '@pulumi/azure-native';
import { envBase } from '../env-base';
import {
  postgresConnectionString,
  postgresqlCluster,
} from './cosmosdb-postgres';
import {
  dataBlobContainer,
  dataQueue,
  dataStorage,
  dataStorageKey,
} from './data-storage-account';
import { envExtend } from '../env-extend';

// dummy secret
new keyvault.Secret(
  `${envBase.KEYVAULT_NAME}-dummy-secret`,
  {
    secretName: `${envBase.KEYVAULT_NAME}-dummy-secret`,
    properties: {
      value: `dummy-secret-value`,
    },
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
  },
  {
    ignoreChanges: [`tags`],
  },
);

// database connection string DatabaseConnectionString
new keyvault.Secret(
  `DatabaseConnectionString`,
  {
    secretName: `DatabaseConnectionString`,
    properties: {
      value: postgresConnectionString.apply(
        (connectionString) => connectionString,
      ),
    },
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
  },
  {
    ignoreChanges: [`tags`],
    dependsOn: [postgresqlCluster],
  },
);

// data storage account name StorageAccountName
new keyvault.Secret(
  `StorageAccountName`,
  {
    secretName: `StorageAccountName`,
    properties: {
      value: dataStorage.name.apply((name) => name),
    },
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
  },
  {
    ignoreChanges: [`tags`],
    dependsOn: [dataStorage],
  },
);

// data storage account key StorageAccountKey
new keyvault.Secret(
  `StorageAccountKey`,
  {
    secretName: `StorageAccountKey`,
    properties: {
      value: dataStorageKey.apply((key) => key),
    },
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
  },
  {
    ignoreChanges: [`tags`],
    dependsOn: [dataStorage],
  },
);

// data storage account blob name StorageBlobName
new keyvault.Secret(
  `StorageBlobName`,
  {
    secretName: `StorageBlobName`,
    properties: {
      value: dataBlobContainer.name.apply((name) => name),
    },
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
  },
  {
    ignoreChanges: [`tags`],
    dependsOn: [dataBlobContainer],
  },
);

// data storage queue name StorageQueueName
new keyvault.Secret(
  `StorageQueueName`,
  {
    secretName: `StorageQueueName`,
    properties: {
      value: dataQueue.name.apply((name) => name),
    },
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
  },
  {
    ignoreChanges: [`tags`],
    dependsOn: [dataQueue],
  },
);

// B2C
// B2CTenantName

new keyvault.Secret(
  `B2CTenantName`,
  {
    secretName: `B2CTenantName`,
    properties: {
      value: `${envExtend.B2C_TENANT_NAME}`,
    },
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
  },
  {
    ignoreChanges: [`tags`],
  },
);

// B2CClientId
new keyvault.Secret(
  `B2CClientId`,
  {
    secretName: `B2CClientId`,
    properties: {
      value: `${envExtend.B2C_CLIENT_ID}`,
    },
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
  },
  {
    ignoreChanges: [`tags`],
  },
);

// B2CPolicyName
new keyvault.Secret(
  `B2CPolicyName`,
  {
    secretName: `B2CPolicyName`,
    properties: {
      value: `${envExtend.B2C_POLICY_NAME}`,
    },
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
  },
  {
    ignoreChanges: [`tags`],
  },
);
