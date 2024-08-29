/*
Creates container registry and initiates the docker image build

When first time create docker image it will need to wait for the private endpoint to be created and DNS to resolve.

If the private endpoint is created, it takes about 10 mins for the DNS to resolve.

*/
import { insights, keyvault, network, containerregistry } from '@pulumi/azure-native';
import { envBase } from '../env-base';
import { managedIdentity, managedIdentityKeyVal } from './codedeploy-identity';
import { logAnalyticsWorkspace } from './log-analytic-workspace';
import { dsSettings } from './diagnostic-setting-configs';

const containerRegistryName = `${envBase.PROJECT_NAME_ABBREVIATION}acr${envBase.ENV}`;

// encryption key for container registry
const containerKey = new keyvault.Key(
  `${containerRegistryName}-key`,
  {
    keyName: `${containerRegistryName}-key`,
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
    properties: {
      kty: 'RSA'
    }
  },
  {
    ignoreChanges: ['tags']
  }
);

// container registry
export const containerRegistry = new containerregistry.Registry(
  containerRegistryName,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    registryName: containerRegistryName,
    sku: {
      name: 'Premium'
    },
    adminUserEnabled: true,
    publicNetworkAccess: containerregistry.PublicNetworkAccess.Disabled,
    networkRuleSet: undefined,
    encryption: {
      status: containerregistry.EncryptionStatus.Enabled,
      keyVaultProperties: {
        keyIdentifier: containerKey.keyUri.apply((uri) => uri),
        identity: managedIdentity.then((v) => v.clientId)
      }
    },
    identity: {
      type: containerregistry.ResourceIdentityType.UserAssigned,
      userAssignedIdentities: {
        ...managedIdentityKeyVal
      }
    }
  },
  {
    ignoreChanges: ['tags']
  }
);

// acr diagnostic setting
new insights.DiagnosticSetting(
  `${containerRegistryName}-diagnostic`,
  {
    name: `${containerRegistryName}-diagnostic`,
    resourceUri: containerRegistry.id.apply((id) => id),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    logs: dsSettings.containerRegistryDSLogItem,
    metrics: dsSettings.containerRegistryDSMetricsItem
  },
  {
    dependsOn: [logAnalyticsWorkspace, containerRegistry],
    deleteBeforeReplace: true
  }
);

// private endpoint for container registry
const containerRegistryPept = new network.PrivateEndpoint(
  `${containerRegistryName}-pept`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${containerRegistryName}-pept`,
    customNetworkInterfaceName: `${containerRegistryName}-pept-nic`,
    subnet: {
      id: envBase.PRIVATE_ENDPOINT_SUBNET
    },
    privateLinkServiceConnections: [
      {
        name: `${containerRegistryName}-pept-connection`,
        privateLinkServiceId: containerRegistry.id.apply((id) => id),
        groupIds: ['registry']
      }
    ]
  },
  {
    ignoreChanges: ['tags'],
    dependsOn: [containerRegistry]
  }
);

// acr pept diagnostic setting
new insights.DiagnosticSetting(
  `${containerRegistryName}-pept-diagnostic`,
  {
    name: `${containerRegistryName}-pept-diagnostic`,
    resourceUri: containerRegistryPept.networkInterfaces.apply((networkInterfaces) => {
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
    metrics: dsSettings.peptDSMetricsItem
  },
  {
    dependsOn: [logAnalyticsWorkspace, containerRegistryPept],
    deleteBeforeReplace: true
  }
);

export const acrCredentials = containerregistry
  .listRegistryCredentialsOutput({
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    registryName: containerRegistry.name.apply((name) => name)
  })
  .apply((creds) => {
    return creds;
  });
