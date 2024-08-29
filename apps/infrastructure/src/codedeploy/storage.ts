// Creates storage resources for the code deployment.
import { Key } from '@pulumi/azure-native/keyvault';
import { envBase } from './../env-base';
import { vault, vaultPept } from './keyvault';
import {
  AccessTier,
  Kind,
  MinimumTlsVersion,
  SkuName,
  StorageAccount,
  IdentityType,
  DefaultAction,
  KeySource,
  Bypass,
  KeyType,
  BlobContainer,
  PublicAccess
} from '@pulumi/azure-native/storage';
import { identityPolicy, managedIdentity } from './identity';
import { PrivateEndpoint } from '@pulumi/azure-native/network';

const codeDeployStorageKey = new Key(
  'code-deploy-storage-key',
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    keyName: 'code-deploy-storage-key',
    properties: {
      kty: 'RSA'
    },
    vaultName: envBase.KEYVAULT_NAME
  },
  {
    ignoreChanges: ['tags'],
    dependsOn: [vault, vaultPept]
  }
);

const codeDeployStorage = new StorageAccount(
  envBase.CODEDEPLOY_STORAGE_NAME,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    accountName: envBase.CODEDEPLOY_STORAGE_NAME,
    location: envBase.AZURE_RESOURCE_LOCATION,
    sku: {
      name: SkuName.Standard_LRS
    },
    kind: Kind.StorageV2,
    accessTier: AccessTier.Cool,
    minimumTlsVersion: MinimumTlsVersion.TLS1_2,
    enableHttpsTrafficOnly: true,
    allowSharedKeyAccess: true,
    allowBlobPublicAccess: false,
    identity: {
      type: IdentityType.UserAssigned,
      userAssignedIdentities: managedIdentity.id.apply((id) => [id])
    },
    networkRuleSet: {
      defaultAction: DefaultAction.Deny,
      bypass: Bypass.AzureServices,
      ipRules: []
    },
    encryption: {
      keySource: KeySource.Microsoft_Keyvault,
      services: {
        blob: { enabled: true },
        file: { enabled: true },
        table: { keyType: KeyType.Account, enabled: true },
        queue: { keyType: KeyType.Account, enabled: true }
      },
      requireInfrastructureEncryption: true,
      keyVaultProperties: {
        keyName: codeDeployStorageKey.name,
        keyVaultUri: vault.name.apply((name) => `https://${name}.vault.azure.net`)
      },
      encryptionIdentity: {
        encryptionUserAssignedIdentity: managedIdentity.id.apply((id) => id)
      }
    }
  },
  {
    dependsOn: [codeDeployStorageKey, vault, vaultPept, managedIdentity, identityPolicy],
    protect: true,
    ignoreChanges: ['tags']
  }
);

const codeDeployPept = new PrivateEndpoint(
  `${envBase.CODEDEPLOY_STORAGE_NAME}-blob-pept`,
  {
    id: `${envBase.CODEDEPLOY_STORAGE_NAME}-blob-pept`,
    privateEndpointName: `${envBase.CODEDEPLOY_STORAGE_NAME}-blob-pept`,
    customNetworkInterfaceName: `${envBase.CODEDEPLOY_STORAGE_NAME}-blob-pept-nic`,
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    location: envBase.AZURE_RESOURCE_LOCATION,
    privateLinkServiceConnections: [
      {
        name: `${envBase.CODEDEPLOY_STORAGE_NAME}-blob-pept-connection`,
        groupIds: ['blob'],
        privateLinkServiceId: codeDeployStorage.id
      }
    ],
    subnet: {
      id: envBase.PRIVATE_ENDPOINT_SUBNET
    }
  },
  {
    ignoreChanges: ['tags', 'privateLinkServiceConnections'],
    dependsOn: [codeDeployStorage]
  }
);

new BlobContainer(
  `${envBase.PROJECT_NAME_ABBREVIATION}-pulumi-state`,
  {
    containerName: 'pulumistate',
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    accountName: codeDeployStorage.name,
    publicAccess: PublicAccess.None
  },
  {
    dependsOn: [codeDeployStorage, codeDeployPept],
    ignoreChanges: ['tags']
  }
);
