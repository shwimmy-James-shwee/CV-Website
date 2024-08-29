import { DefaultAzureCredential, AzureCliCredential } from '@azure/identity';
export const credential = () =>
  process.env.NODE_ENV === 'local' ? new AzureCliCredential() : new DefaultAzureCredential();
