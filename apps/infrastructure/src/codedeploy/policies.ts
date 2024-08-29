import { AccessPolicy } from '@pulumi/azure-native/keyvault';
import { envBase } from './../env-base';
import { vault, vaultPept } from './keyvault';

const storagePolicy = new AccessPolicy(
  'storage-access-policy',
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
    policy: {
      tenantId: envBase.ARM_TENANT_ID,
      objectId: 'a17a2ca7-f0a2-4ff1-803e-55f25ddbaed5',
      permissions: { keys: ['Get', 'UnwrapKey', 'WrapKey'] }
    }
  },
  {
    dependsOn: [vault, vaultPept]
  }
);

const containerPolicy = new AccessPolicy(
  'container-access-policy',
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
    policy: {
      tenantId: envBase.ARM_TENANT_ID,
      objectId: '6aa94174-d5b2-460b-9061-5060db0c6438',
      permissions: {
        keys: ['Create', 'Decrypt', 'Encrypt', 'Get', 'List', 'Sign', 'UnwrapKey', 'WrapKey'],
        secrets: ['Get', 'List', 'Set']
      }
    }
  },
  {
    dependsOn: [vault, vaultPept, storagePolicy]
  }
);

const cosmosPolicy = new AccessPolicy(
  'cosmos-access-policy',
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
    policy: {
      tenantId: envBase.ARM_TENANT_ID,
      objectId: '0d6a0cdd-1247-4737-bc46-98b9ec2dcb7b',
      permissions: {
        keys: ['Get', 'UnwrapKey', 'WrapKey']
      }
    }
  },
  {
    dependsOn: [vault, vaultPept, containerPolicy]
  }
);

export const finalPolicy = new AccessPolicy(
  'sqlserver-access-policy',
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
    policy: {
      tenantId: envBase.ARM_TENANT_ID,
      objectId: '9a3f3287-3344-49e7-9cea-e5c1b1ea69ae',
      permissions: {
        keys: ['Get', 'UnwrapKey', 'WrapKey']
      }
    }
  },
  {
    dependsOn: [vault, vaultPept, cosmosPolicy]
  }
);
