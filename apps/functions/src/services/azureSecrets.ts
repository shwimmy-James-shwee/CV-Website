import { SecretClient } from '@azure/keyvault-secrets';
import { credential } from './azureCredentials';
const url = 'https://' + process.env.AZURE_KEY_VAULT_NAME + '.vault.azure.net';
export const secrets = new SecretClient(url, credential());
