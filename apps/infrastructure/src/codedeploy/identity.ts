import { UserAssignedIdentity } from '@pulumi/azure-native/managedidentity';
import { envBase } from './../env-base';
import { vault, vaultPept } from './keyvault';
import { AccessPolicy } from '@pulumi/azure-native/keyvault';
import { finalPolicy } from './policies';

export const managedIdentity = new UserAssignedIdentity(
  envBase.MANAGED_IDENTITY_NAME,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    resourceName: envBase.MANAGED_IDENTITY_NAME,
    location: envBase.AZURE_RESOURCE_LOCATION,
  },
  {
    dependsOn: [vault, vaultPept],
    ignoreChanges: ['tags'],
  },
);

export const identityPolicy = new AccessPolicy(
  'identity-access-policy',
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    vaultName: envBase.KEYVAULT_NAME,
    policy: {
      tenantId: envBase.ARM_TENANT_ID,
      objectId: managedIdentity.principalId.apply((id) => id),
      permissions: {
        certificates: [
          'Backup',
          'Create',
          'Delete',
          'DeleteIssuers',
          'Get',
          'GetIssuers',
          'Import',
          'List',
          'ListIssuers',
          'ManageContacts',
          'ManageIssuers',
          'Purge',
          'Recover',
          'Restore',
          'SetIssuers',
          'Update',
        ],
        keys: [
          'Backup',
          'Create',
          'Decrypt',
          'Delete',
          'Encrypt',
          'Get',
          'Import',
          'List',
          'Purge',
          'Recover',
          'Restore',
          'Sign',
          'UnwrapKey',
          'Update',
          'Verify',
          'WrapKey',
          'Release',
          'Rotate',
          'GetRotationPolicy',
          'SetRotationPolicy',
        ],
        secrets: ['Backup', 'Delete', 'Get', 'List', 'Purge', 'Recover', 'Restore', 'Set'],
      },
    },
  },
  {
    dependsOn: [vault, vaultPept, finalPolicy],
    protect: true,
    ignoreChanges: ['tags'],
  },
);
