/*
Import managed identity from code deployed resources

The Identity should be use by service that need to access particular resources that need to be secured.
*/

import { insights, network, storage } from '@pulumi/azure-native';
import { envBase } from '../env-base';
import { logAnalyticsWorkspace } from './log-analytic-workspace';
import { dsSettings } from './diagnostic-setting-configs';

const codeDeployStorage = storage.getStorageAccount({
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  accountName: envBase.CODEDEPLOY_STORAGE_NAME,
});

const codeDeployBlobPept = network.getPrivateEndpoint({
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  privateEndpointName: `${envBase.CODEDEPLOY_STORAGE_NAME}-blob-pept`,
});

// storage account diagnostic setting
new insights.DiagnosticSetting(
  `${envBase.CODEDEPLOY_STORAGE_NAME}-diagnostic`,
  {
    name: `${envBase.CODEDEPLOY_STORAGE_NAME}-diagnostic`,
    resourceUri: codeDeployStorage.then((v) => v.id),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    metrics: dsSettings.storageDSMetricsItem,
  },
  {
    dependsOn: [logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);

// blob diagnostic setting
new insights.DiagnosticSetting(
  `${envBase.CODEDEPLOY_STORAGE_NAME}-blob-diagnostic`,
  {
    name: `${envBase.CODEDEPLOY_STORAGE_NAME}-blob-diagnostic`,
    resourceUri: codeDeployStorage.then((v) => `${v.id}/blobServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem,
  },
  {
    dependsOn: [logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);

// blob pept diagnostic setting
new insights.DiagnosticSetting(
  `${envBase.CODEDEPLOY_STORAGE_NAME}-blob-pept-diagnostic`,
  {
    name: `${envBase.CODEDEPLOY_STORAGE_NAME}-blob-pept-diagnostic`,
    resourceUri: codeDeployBlobPept.then(
      (v) => v.networkInterfaces[0].id || '',
    ),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    metrics: dsSettings.peptDSMetricsItem,
  },
  {
    dependsOn: [logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);

// queue diagnostic setting
new insights.DiagnosticSetting(
  `${envBase.CODEDEPLOY_STORAGE_NAME}-queue-diagnostic`,
  {
    name: `${envBase.CODEDEPLOY_STORAGE_NAME}-queue-diagnostic`,
    resourceUri: codeDeployStorage.then((v) => `${v.id}/queueServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem,
  },
  {
    dependsOn: [logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);

// table diagnostic setting
new insights.DiagnosticSetting(
  `${envBase.CODEDEPLOY_STORAGE_NAME}-table-diagnostic`,
  {
    name: `${envBase.CODEDEPLOY_STORAGE_NAME}-table-diagnostic`,
    resourceUri: codeDeployStorage.then((v) => `${v.id}/tableServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem,
  },
  {
    dependsOn: [logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);

// file diagnostic setting
new insights.DiagnosticSetting(
  `${envBase.CODEDEPLOY_STORAGE_NAME}-file-diagnostic`,
  {
    name: `${envBase.CODEDEPLOY_STORAGE_NAME}-file-diagnostic`,
    resourceUri: codeDeployStorage.then((v) => `${v.id}/fileServices/default`),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.storageDSLogItem,
    metrics: dsSettings.storageDSMetricsItem,
  },
  {
    dependsOn: [logAnalyticsWorkspace],
    deleteBeforeReplace: true,
  },
);
