import { addEmailToQueue } from '../azureStorageQueue';
import { QueueClient, QueueSendMessageResponse } from '@azure/storage-queue';

jest.mock('@azure/storage-queue', () => ({
  QueueClient: jest.fn().mockImplementation(() => ({
    sendMessage: jest.fn().mockResolvedValue({ messageId: '123' } as QueueSendMessageResponse)
  })),
  StorageSharedKeyCredential: jest.fn().mockImplementation(() => {})
}));

describe('addEmailToQueue', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send encrypted message to the queue', async () => {
    process.env.AzureWebJobsStorage =
      'DefaultEndpointsProtocol=https;AccountName=<accountName>;AccountKey=<accountKey>;EndpointSuffix=core.windows.net';
    // Arrange
    const mockMessage = {
      id: 'test id',
      header: 'test header',
      content: 'test content',
      sentTo: ['hanli@kpmg.co.nz']
    };

    // Act
    const result = await addEmailToQueue(mockMessage);

    // Assert
    expect(QueueClient).toHaveBeenCalledWith('https://<accountName>.queue.core.windows.net/tpl-queue', {});
    expect(result).toEqual({ messageId: '123' } as QueueSendMessageResponse);
  });
});
