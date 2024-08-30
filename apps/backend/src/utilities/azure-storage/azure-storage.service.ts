import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BlobServiceClient, StorageSharedKeyCredential as BlobSharedKeyCredential } from '@azure/storage-blob';
import { env } from '../../config/env';
import {
  QueueClient,
  QueueSendMessageResponse,
  StorageSharedKeyCredential as QueueSharedKeyCredential
} from '@azure/storage-queue';
import { encrypt } from '../helperFunctions';

export interface queueEmail {
  id: string;
  sentTo: string[];
  header: string;
  content: string;
}

@Injectable()
export class AzureStorageService {
  Account = env.AZURE_STORAGE_ACCOUNT;
  Key = env.AZURE_STORAGE_KEY;
  Container = env.AZURE_CONTAINER_NAME;
  QueueName = env.EMAIL_QUEUE_NAME;
  BlobSharedKeyCredential = new BlobSharedKeyCredential(this.Account, this.Key);
  QueueSharedKeyCredential = new QueueSharedKeyCredential(this.Account, this.Key);
  BlobServiceClient = new BlobServiceClient(
    `https://${this.Account}.blob.core.windows.net`,
    this.BlobSharedKeyCredential
  );
  ContainerClient = this.BlobServiceClient.getContainerClient(this.Container);
  QueueClient = new QueueClient(
    `https://${this.Account}.queue.core.windows.net/${this.QueueName}`,
    this.QueueSharedKeyCredential
  );

  getUploadBlobPath(fileName: string) {
    return `uploadfiles/${fileName}`;
  }

  getDownloadBlobPath(fileName: string) {
    return fileName.replaceAll(`https://${this.Account}.blob.core.windows.net/${this.Container}/`, '');
  }

  /**
   * Uploads data to Azure Storage.
   * @param file - The file to be uploaded.
   * @param blobFileName - The name of the blob file.
   * @returns The URL of the uploaded file.
   * @throws InternalServerErrorException if the file fails to upload to Azure Storage.
   */
  async uploadData(file: Express.Multer.File, blobFileName: string) {
    const blockBlobClient = this.ContainerClient.getBlockBlobClient(this.getUploadBlobPath(blobFileName));
    const res = await blockBlobClient.uploadData(file.buffer);
    if (res._response.status === 201) {
      return blockBlobClient.url;
    } else {
      throw new InternalServerErrorException(
        `Failed to upload file ${file.originalname} to Azure Storage. Error: ${JSON.stringify(res._response)}`
      );
    }
  }

  /**
   * Downloads data from Azure Storage.
   * @param blobFileName - The name of the blob file to download.
   * @returns A readable stream containing the downloaded data.
   * @throws {InternalServerErrorException} If the download fails.
   */
  async downloadData(blobFileName: string) {
    const blockBlobClient = this.ContainerClient.getBlockBlobClient(this.getDownloadBlobPath(blobFileName));
    const res = await blockBlobClient.download();

    if (res._response.status !== 200) {
      throw new InternalServerErrorException(
        `Failed to download file ${blobFileName} from Azure Storage. Error: ${JSON.stringify(res._response)}`
      );
    }
    return res.readableStreamBody;
  }

  /**
   * Adds an email message to the queue.
   * @param message - The email message to be added to the queue.
   * @returns A promise that resolves to the response from the queue service.
   */
  async addEmailToQueue(message: queueEmail): Promise<QueueSendMessageResponse> {
    if (message.header) {
      message.header = encrypt(this.Key, message.header);
    }

    if (message.content) {
      message.content = encrypt(this.Key, message.content);
    }

    return await this.QueueClient.sendMessage(JSON.stringify(message));
  }
}
