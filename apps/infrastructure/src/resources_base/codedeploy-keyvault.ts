/*
Import managed identity from code deployed resources

The Identity should be use by service that need to access particular resources that need to be secured.
*/
// import * as pulumi from '@pulumi/pulumi';
import { insights, keyvault, network } from '@pulumi/azure-native';
import { envBase } from '../env-base';
import { dsSettings } from './diagnostic-setting-configs';
import { logAnalyticsWorkspace } from './log-analytic-workspace';

export const vault = keyvault.getVault({
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  vaultName: envBase.KEYVAULT_NAME
});

const vaultPept = network.getPrivateEndpoint({
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  privateEndpointName: `${envBase.KEYVAULT_NAME}-pept`
});

new insights.DiagnosticSetting(
  `${envBase.KEYVAULT_NAME}-diagnostic`,
  {
    name: `${envBase.KEYVAULT_NAME}-diagnostic`,
    // resourceUri: pulumi.output(vault).apply((v) => v.id),
    resourceUri: vault.then((v) => v.id),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.vaultDSLogItem,
    metrics: dsSettings.vaultDSMetricsItem
  },
  {
    dependsOn: [logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);

new insights.DiagnosticSetting(
  `${envBase.KEYVAULT_NAME}-pept-diagnostic`,
  {
    name: `${envBase.KEYVAULT_NAME}-pept-diagnostic`,
    // resourceUri: pulumi.output(vaultPept).apply((v) => v.networkInterfaces[0].id || ``),
    resourceUri: vaultPept.then((v) => {
      if (v) {
        if (v.networkInterfaces) {
          if (v.networkInterfaces[0]) {
            if (v.networkInterfaces[0]?.id) {
              return v.networkInterfaces[0].id;
            }
          }
        }
      }
      return ``;
    }),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    metrics: dsSettings.peptDSMetricsItem
  },
  {
    dependsOn: [logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);
