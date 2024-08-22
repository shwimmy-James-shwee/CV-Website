/*
Create the app service plan for app service usage
*/
import { web, insights } from "@pulumi/azure-native";
import { envBase } from "../env-base";
import { envExtend } from "../env-extend";

export const appServicePlan = new web.AppServicePlan(
  `${envBase.PROJECT_NAME_ABBREVIATION}-asp-${envBase.ENV}`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    name: `${envBase.PROJECT_NAME_ABBREVIATION}-asp-${envBase.ENV}`,
    kind: `Linux,Container`,
    reserved: true,
    sku: {
      name: envExtend.pricingTier
    }
  },
  {
    ignoreChanges: [`tags`],
    customTimeouts: { create: `30m`, update: `30m`, delete: `30m` }
  }
);

if (![`b1`, `b2`, `b3`, `f1`].includes(envExtend.pricingTier.toLowerCase())) {
  new insights.AutoscaleSetting(`${envBase.PROJECT_NAME_ABBREVIATION}-asp-${envBase.ENV}-autoscale`, {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    autoscaleSettingName: `${envBase.PROJECT_NAME_ABBREVIATION}-asp-${envBase.ENV}-autoscale`,
    targetResourceUri: appServicePlan.id,
    profiles: [
      {
        name: `cpu_base_profile`,
        capacity: {
          default: `${envExtend.minCapacity}`,
          minimum: `${envExtend.minCapacity}`,
          maximum: `${envExtend.maxCapacity}`
        },
        rules: [
          {
            metricTrigger: {
              metricName: `CpuPercentage`,
              metricResourceUri: appServicePlan.id.apply((id) => `${id}`),
              metricNamespace: `Microsoft.Web/serverfarms`,
              operator: `GreaterThanOrEqual`,
              threshold: 65,
              timeAggregation: `Average`,
              statistic: `Average`,
              timeGrain: `PT1M`,
              timeWindow: `PT5M`,
              dividePerInstance: false
            },
            scaleAction: {
              direction: insights.ScaleDirection.Increase,
              type: insights.ScaleType.ChangeCount,
              value: `1`,
              cooldown: `PT1M`
            }
          },
          {
            metricTrigger: {
              metricName: `CpuPercentage`,
              metricResourceUri: appServicePlan.id,
              metricNamespace: `Microsoft.Web/serverfarms`,
              operator: `LessThan`,
              threshold: 30,
              timeAggregation: `Average`,
              statistic: `Average`,
              timeGrain: `PT1M`,
              timeWindow: `PT5M`,
              dividePerInstance: false
            },
            scaleAction: {
              direction: insights.ScaleDirection.Decrease,
              type: insights.ScaleType.ChangeCount,
              value: `1`,
              cooldown: `PT1M`
            }
          }
        ]
      }
    ]
  });
}
