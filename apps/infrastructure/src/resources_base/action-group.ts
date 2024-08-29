/*
Create action group and for different level of alerts

bc3 is for critical alerts
bc2-0 is for warning alerts
*/

import { insights } from '@pulumi/azure-native';
import { envBase } from './../env-base';
import { input } from '@pulumi/azure-native/types';

const emailDevOps: input.insights.EmailReceiverArgs = {
  name: `${envBase.PROJECT_NAME_ABBREVIATION}-devops-team`,
  emailAddress: `softwaredevops@kpmg.co.nz`
};

const smsSMEDevOps: input.insights.SmsReceiverArgs = {
  name: `${envBase.PROJECT_NAME_ABBREVIATION}-sme-dev`,
  countryCode: `64`,
  phoneNumber: `2108456731`
};

export const bc3ActionGroup = new insights.ActionGroup(`${envBase.PROJECT_NAME_ABBREVIATION}-bc3`, {
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  location: `Global`,
  actionGroupName: `${envBase.PROJECT_NAME_ABBREVIATION}-bc3`,
  groupShortName: `${envBase.PROJECT_NAME_ABBREVIATION}-bc3`,
  enabled: true,
  emailReceivers: [emailDevOps],
  smsReceivers: [smsSMEDevOps]
});

export const bc20ActionGroup = new insights.ActionGroup(`${envBase.PROJECT_NAME_ABBREVIATION}-bc20`, {
  resourceGroupName: envBase.AZURE_RESOURCE_GROUP,
  location: `Global`,
  actionGroupName: `${envBase.PROJECT_NAME_ABBREVIATION}-bc20`,
  groupShortName: `${envBase.PROJECT_NAME_ABBREVIATION}-bc20`,
  enabled: true,
  emailReceivers: [emailDevOps],
  smsReceivers: [smsSMEDevOps]
});
