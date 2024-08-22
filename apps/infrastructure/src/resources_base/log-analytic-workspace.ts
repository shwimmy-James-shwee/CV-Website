/*
Import managed identity from code deployed resources

The Identity should be use by service that need to access particular resources that need to be secured.
*/

import { insights, operationalinsights } from "@pulumi/azure-native";
import { envBase } from "../env-base";
import { dsSettings } from "./diagnostic-setting-configs";

const logAnalyticsWorkspaceName = `${envBase.PROJECT_NAME_ABBREVIATION}-log-analytic-workspace-${envBase.ENV}`;

export const logAnalyticsWorkspace = new operationalinsights.Workspace(
  logAnalyticsWorkspaceName,
  {
    workspaceName: logAnalyticsWorkspaceName,
    location: envBase.AZURE_RESOURCE_LOCATION,
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    retentionInDays: 90,
    sku: {
      name: `PerGB2018`
    },
    publicNetworkAccessForQuery: operationalinsights.PublicNetworkAccessType.Enabled,
    publicNetworkAccessForIngestion: operationalinsights.PublicNetworkAccessType.Enabled
  },
  {
    ignoreChanges: [`tags`]
  }
);

new insights.DiagnosticSetting(
  `${logAnalyticsWorkspaceName}-diagnostic-setting`,
  {
    logs: dsSettings.logAnalyticDSLogItem,
    metrics: dsSettings.logAnalyticDSMetricsItem,
    resourceUri: logAnalyticsWorkspace.id,
    workspaceId: logAnalyticsWorkspace.id
  },
  {
    dependsOn: [logAnalyticsWorkspace],
    deleteBeforeReplace: true
  }
);
