/*
Create the app service plan for app service usage
*/
import { web } from '@pulumi/azure-native';
import { envBase } from '../env-base';
import { envExtend } from '../env-extend';

export const appServicePlan = new web.AppServicePlan(
  `${envBase.PROJECT_NAME_ABBREVIATION}-asp-${envBase.ENV}`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    name: `${envBase.PROJECT_NAME_ABBREVIATION}-asp-${envBase.ENV}`,
    kind: 'Linux,Container',
    reserved: true,
    sku: {
      name: envExtend.pricingTier,
    },
  },
  {
    ignoreChanges: ['tags'],
    customTimeouts: { create: '30m', update: '30m', delete: '30m' },
  },
);
