import { StorageSharedKeyCredential, QueueClient, QueueSendMessageResponse } from '@azure/storage-queue';
import { encrypt } from './helperFunctions';

export interface queueEmail {
  id: string;
  sentTo: string[];
  header: string;
  content: string;
}

export async function addEmailToQueue(message: queueEmail): Promise<QueueSendMessageResponse> {
  const connectionStringParts = `${process.env.AzureWebJobsStorage}`.split(';');
  const accountName = connectionStringParts[1].replace('AccountName=', '');
  const accountKey = connectionStringParts[2].replace('AccountKey=', '');
  const queueName = process.env.EMAIL_QUEUE_NAME || 'tpl-queue';

  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
  const queueClient = new QueueClient(
    `https://${accountName}.queue.core.windows.net/${queueName}`,
    sharedKeyCredential
  );

  if (message.header) {
    message.header = encrypt(accountKey, message.header);
  }
  if (message.content) {
    message.content = encrypt(accountKey, message.content);
  }
  return await queueClient.sendMessage(JSON.stringify(message));
}
