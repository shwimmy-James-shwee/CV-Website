import * as fs from 'fs';
const bannedPws = fs
  .readFileSync('./utils/banned_password_list.txt', 'utf-8')
  .trim()
  .replaceAll(/&/g, '&amp;')
  .replaceAll(/'/g, '&quot;')
  .split('\n');

const bannedPwsXml = bannedPws
  .map(
    (password) =>
      `                    <InputParameter Id="${password}" DataType="string" Value="true" />`,
  )
  .join('\n');

export const replaceParams = {
  b2cTenantName: 'taxctdev',
  googleSSOClientId: 'dummyid',
  kpmgSSOClientId: 'dummyid',
  kpmgSSOTenantId: 'dummyid',
  microsoftSSOClientId: 'dummyid',
  localAccountAppClientId: 'dummyid',
  localAccountAppObjectId: 'dummyid',
  localAccountAppAudienceResourceId: 'dummyid',
  passwordHistoryCheckEndpoint:
    'https://taxct-be-dev-staging.azurewebsites.net/api/v1/pwd-history-check', // to update
  passwordExpireInSeconds: '3600', // prod should be 90days X 3600 X 24
  bannedPasswordsXML: bannedPwsXml,
  AppInsightInstrumentationKeyForB2C: 'dummy-app-insight-inst-key',
  AppInsightDeveloperModeForB2C: 'false', // true for dev
};
