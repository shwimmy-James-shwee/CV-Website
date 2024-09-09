import { BlobServiceClient, ContainerClient, HttpResponse, StorageSharedKeyCredential } from '@azure/storage-blob';

export function getContainerClient() {
  const connectionStringParts = `${process.env.AzureWebJobsStorage}`.split(';');
  const account = connectionStringParts[1].replace('AccountName=', '');
  const accountKey = connectionStringParts[2].replace('AccountKey=', '');
  const containerName = process.env.STORAGE_BLOB_NAME || 'tplv1-blob';

  const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
  const blobServiceClient = new BlobServiceClient(`https://${account}.blob.core.windows.net`, sharedKeyCredential);

  const containerClient: ContainerClient = blobServiceClient.getContainerClient(containerName);

  return containerClient;
}

export async function downloadBlobToFile(blobName: string, fileNameWithPath: string): Promise<HttpResponse> {
  const blobClient = getContainerClient().getBlobClient(blobName);
  const res = await blobClient.downloadToFile(fileNameWithPath);
  return res._response;
}

export async function deleteBlob(blobName: string) {
  const blobClient = getContainerClient().getBlobClient(blobName);
  const res = await blobClient.deleteIfExists();
  return res._response;
}
