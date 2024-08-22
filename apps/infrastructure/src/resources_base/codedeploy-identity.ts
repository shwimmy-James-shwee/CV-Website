/*
Import managed identity from code deployed resources

The Identity should be use by service that need to access particular resources that need to be secured.
*/
import * as pulumi from "@pulumi/pulumi";
import { managedidentity } from "@pulumi/azure-native";
import { envBase } from "../env-base";

export const managedIdentity = managedidentity.getUserAssignedIdentity({
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  resourceName: envBase.MANAGED_IDENTITY_NAME
});

/**
 * managed identity key value pair
 * use by spreading it to the identity object
 * ...managedIdentityKeyVal
 */
export const managedIdentityKeyVal = pulumi.output(managedIdentity).apply((v) => {
  return { [`${v.id}`]: {} };
});
