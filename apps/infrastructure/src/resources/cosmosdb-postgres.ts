import { envBase } from '../env-base';
import { dbforpostgresql, insights, network } from '@pulumi/azure-native';
import { envExtend } from '../env-extend';
import { logAnalyticsWorkspace } from '../resources_base/log-analytic-workspace';
import { dsSettings } from '../resources_base/diagnostic-setting-configs';

const postgresqlName = `${envBase.PROJECT_NAME_ABBREVIATION}-postgresql-cluster-${envBase.ENV}`;
export const postgresqlCluster = new dbforpostgresql.Cluster(
  postgresqlName,
  {
    clusterName: postgresqlName,
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    location: envBase.AZURE_RESOURCE_LOCATION,
    administratorLoginPassword: envExtend.POSTGRES_ADMIN_PASSWORD,
    coordinatorServerEdition: envExtend.coordinatorServerEdition,
    coordinatorStorageQuotaInMb: envExtend.coordinatorStorageQuotaInMb,
    coordinatorVCores: envExtend.coordinatorVcoreCount,
    nodeCount: envExtend.nodeCount,
    nodeStorageQuotaInMb: envExtend.nodeStorageQuotaInMb,
    nodeVCores: envExtend.nodeVcores,
    enableShardsOnCoordinator: envExtend.shardsOnCoordinatorEnabled,
    postgresqlVersion: `16`,
    citusVersion: `12.1`,
    enableHa: envExtend.haEnabled
  },
  {
    ignoreChanges: [`tags`],
    customTimeouts: {
      create: `30m`,
      update: `30m`,
      delete: `30m`
    },
    protect: true
  }
);

// postgres private endpoint
const postgresqlPrivateEndpoint = new network.PrivateEndpoint(
  `${postgresqlName}-pept`,
  {
    resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
    privateEndpointName: `${postgresqlName}-pept`,
    customNetworkInterfaceName: `${postgresqlName}-pept-nic`,
    subnet: {
      id: envExtend.PRIVATE_ENDPOINT_SUBNET
    },
    privateLinkServiceConnections: [
      {
        name: `${postgresqlName}-plink`,
        privateLinkServiceId: postgresqlCluster.id.apply((id) => id),
        groupIds: [`coordinator`]
      }
    ]
  },
  {
    dependsOn: [postgresqlCluster]
  }
);

// private endpoint diagnostic setting
new insights.DiagnosticSetting(
  `${postgresqlName}-pept-diagnostic`,
  {
    name: `${postgresqlName}-pept-diagnostic`,
    resourceUri: postgresqlPrivateEndpoint.networkInterfaces.apply((networkInterfaces) => {
      if (networkInterfaces) {
        if (networkInterfaces[0]) {
          if (networkInterfaces[0]?.id) {
            return networkInterfaces[0].id;
          }
        }
      }
      return ``;
    }),
    workspaceId: logAnalyticsWorkspace.id.apply((id) => id),
    metrics: dsSettings.peptDSMetricsItem
  },
  {
    dependsOn: [logAnalyticsWorkspace, postgresqlPrivateEndpoint],
    deleteBeforeReplace: true
  }
);

// exporting the postgres connection string
export const postgresConnectionString = postgresqlCluster.serverNames.apply((serverNames) => {
  const firstServerName = serverNames[0];
  return `postgres://citus:${envExtend.POSTGRES_ADMIN_PASSWORD}@${firstServerName?.fullyQualifiedDomainName}/citus?sslmode=require&schema=application`;
});
