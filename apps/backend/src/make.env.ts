import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential, AzureCliCredential } from '@azure/identity';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
dotenv.config();

const credential = process.env.NODE_ENV === 'local' ? new AzureCliCredential() : new DefaultAzureCredential();

const url = 'https://' + process.env['AZURE_KEY_VAULT_NAME'] + '.vault.azure.net';

export const secrets = new SecretClient(url, credential);

const envPathName = '../../.env';
async function syncSecretAndWriteFile(exportName: string, secretName: string) {
  /**
   * flags:
   *  - w = Open file for reading and writing. File is created if not exists
   *  - a+ = Open file for reading and appending. The file is created if not exists
   */
  const data = `\n${exportName}=\"${(await secrets.getSecret(secretName)).value}\"`;
  writeFileSync(join(__dirname, envPathName), data, {
    flag: 'a+',
  });

  return readFileSync(join(__dirname, envPathName), 'utf-8');
}

syncSecretAndWriteFile('DATABASE_URL', 'DatabaseConnectionString');
syncSecretAndWriteFile('DIRECT_URL', 'DatabaseConnectionString');
syncSecretAndWriteFile('B2C_TENANT_NAME', 'B2CTenantName');
syncSecretAndWriteFile('B2C_CLIENT_ID', 'B2CClientId');
syncSecretAndWriteFile('B2C_POLICY_NAME', 'B2CPolicyName');
syncSecretAndWriteFile('AZURE_STORAGE_ACCOUNT', 'StorageAccountName');
syncSecretAndWriteFile('AZURE_STORAGE_KEY', 'StorageAccountKey');
syncSecretAndWriteFile('AZURE_CONTAINER_NAME', 'StorageBlobName');
syncSecretAndWriteFile('AZURE_QUEUE_NAME', 'StorageQueueName');
