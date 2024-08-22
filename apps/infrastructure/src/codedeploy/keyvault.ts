// Creates a Key Vault and a private endpoint for the Key Vault.

import { PrivateEndpoint } from "@pulumi/azure-native/network";
import { KeyVault } from "@pulumi/azure/keyvault";
import { envBase } from "../env-base";

export const vault = new KeyVault(
  envBase.KEYVAULT_NAME,
  {
    name: envBase.KEYVAULT_NAME,
    location: envBase.AZURE_RESOURCE_LOCATION,
    tenantId: envBase.ARM_TENANT_ID,
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    publicNetworkAccessEnabled: false,
    enabledForDeployment: true,
    enabledForDiskEncryption: true,
    enabledForTemplateDeployment: true,
    softDeleteRetentionDays: 90,
    purgeProtectionEnabled: true,
    skuName: `standard`,
    networkAcls: {
      bypass: `AzureServices`,
      defaultAction: `Deny`
    }
  },
  {
    ignoreChanges: [`tags`],
    protect: true
  }
);

export const vaultPept = new PrivateEndpoint(
  `${envBase.KEYVAULT_NAME}-pept`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${envBase.KEYVAULT_NAME}-pept`,
    customNetworkInterfaceName: `${envBase.KEYVAULT_NAME}-pept-nic`,
    subnet: {
      id: envBase.PRIVATE_ENDPOINT_SUBNET
    },
    privateLinkServiceConnections: [
      {
        name: `${envBase.KEYVAULT_NAME}-pept-connection`,
        privateLinkServiceId: vault.id,
        groupIds: [`vault`]
      }
    ]
  },
  {
    dependsOn: [vault],
    ignoreChanges: [`tags`]
  }
);
