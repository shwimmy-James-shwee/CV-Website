/*
Configures diagnostic settings for various resources.

*/
import { input } from '@pulumi/azure-native/types';
import { envExtend } from '../env-extend';

// from config import logRetentionDays, pricing_tier
// : {
//     [key: string]: input.insights.LogSettingsArgs[] | input.insights.MetricSettingsArgs[];
//   }
export const dsSettings = {
  // Diagnostic setttings
  logAnalyticDSMetricsItem: [
    {
      category: 'AllMetrics',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.MetricSettingsArgs[],

  logAnalyticDSLogItem: [
    {
      category: 'Audit',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'SummaryLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: true,
      },
    },
  ] as input.insights.LogSettingsArgs[],

  // DS

  appInsightDSLogItem: [
    {
      category: 'AppServiceAuthenticationLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppAvailabilityResults',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppBrowserTimings',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppEvents',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppMetrics',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppDependencies',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppExceptions',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppPageViews',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppPerformanceCounters',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppRequests',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppSystemEvents',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppTraces',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.LogSettingsArgs[],

  storageDSLogItem: [
    {
      category: 'StorageRead',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'StorageWrite',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'StorageDelete',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.LogSettingsArgs[],

  storageDSMetricsItem: [
    {
      category: 'Capacity',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'Transaction',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.MetricSettingsArgs[],

  // private endpoint DS

  peptDSMetricsItem: [
    {
      category: 'AllMetrics',
      enabled: true,
      retentionPolicy: {
        days: 0,
        enabled: false,
      },
    },
  ] as input.insights.MetricSettingsArgs[],

  // Vault DS

  vaultDSMetricsItem: [
    {
      category: 'AllMetrics',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.MetricSettingsArgs[],

  vaultDSLogItem: [
    {
      category: 'AuditEvent',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AzurePolicyEvaluationDetails',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.LogSettingsArgs[],

  // Container Registry DS

  containerRegistryDSLogItem: [
    {
      category: 'ContainerRegistryRepositoryEvents',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'ContainerRegistryLoginEvents',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.LogSettingsArgs[],

  containerRegistryDSMetricsItem: [
    {
      category: 'AllMetrics',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.MetricSettingsArgs[],

  // Cosmos Postgres DS

  cosmosPostgresDSLogItem: [
    {
      category: 'PostgreSQLLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.LogSettingsArgs[],

  cosmosPostgresDSMetricsItem: [
    {
      category: 'AllMetrics',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.MetricSettingsArgs[],

  // Function App DS

  functionAppDSLogItem: [
    {
      category: 'AppServiceAuthenticationLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'FunctionAppLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.LogSettingsArgs[],

  functionAppDSMetricsItem: [
    {
      category: 'AllMetrics',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.MetricSettingsArgs[],

  // Web App DS

  webAppDSLogItem: [
    {
      category: 'AppServiceAuthenticationLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppServiceHTTPLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppServiceConsoleLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppServiceAppLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppServiceAuditLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppServiceIPSecAuditLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
    {
      category: 'AppServicePlatformLogs',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.LogSettingsArgs[],

  webAppDSMetricsItem: [
    {
      category: 'AllMetrics',
      enabled: true,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    },
  ] as input.insights.MetricSettingsArgs[],
};

if (!['b1', 'b2', 'f1', 'b3'].includes(envExtend.pricingTier.toLowerCase())) {
  dsSettings.webAppDSLogItem.push(
    {
      category: 'AppServiceAntivirusScanAuditLogs',
      enabled: false,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    } as input.insights.LogSettingsArgs,
    {
      category: 'AppServiceFileAuditLogs',
      enabled: false,
      retentionPolicy: {
        days: envExtend.logRetentionDays,
        enabled: false,
      },
    } as input.insights.LogSettingsArgs,
  );
}
