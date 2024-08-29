import { getContainerClient, downloadBlobToFile, deleteBlob } from '../storage';
import { BlobServiceClient, ContainerClient, StorageSharedKeyCredential } from '@azure/storage-blob';

const mockBlobClient = {
  downloadToFile: jest.fn().mockResolvedValue({ _response: 'mockResponse' }),
  deleteIfExists: jest.fn().mockResolvedValue({ _response: 'mockResponse' })
};

const mockGetBlobClient = jest.fn().mockReturnValue(mockBlobClient);

jest.mock('@azure/storage-blob', () => ({
  BlobServiceClient: jest.fn().mockImplementation(() => ({
    getContainerClient: jest.fn().mockReturnValue({
      getBlobClient: mockGetBlobClient
    } as unknown as ContainerClient)
  })),
  StorageSharedKeyCredential: jest.fn().mockImplementation(() => {})
}));

describe('getContainerClient', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return a container client', () => {
    process.env.AzureWebJobsStorage =
      'DefaultEndpointsProtocol=https;AccountName=<accountName>;AccountKey=<accountKey>;EndpointSuffix=core.windows.net';

    // Act
    const result = getContainerClient();

    // Assert
    expect(BlobServiceClient).toHaveBeenCalledWith(
      'https://<accountName>.blob.core.windows.net',
      expect.any(StorageSharedKeyCredential)
    );
    expect(result).toBeDefined();
  });
});

describe('downloadBlobToFile', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should download a blob to a file', async () => {
    const blobName = 'testBlob';
    const fileNameWithPath = '/path/to/file.txt';
    // Act
    const result = await downloadBlobToFile(blobName, fileNameWithPath);

    // Assert
    expect(mockGetBlobClient).toHaveBeenCalledWith(blobName);
    expect(mockBlobClient.downloadToFile).toHaveBeenCalledWith(fileNameWithPath);
    expect(result).toBe('mockResponse');
  });
});

describe('deleteBlob', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should delete a blob', async () => {
    const blobName = 'testDeleteBlob';
    // Act
    const result = await deleteBlob(blobName);

    // Assert
    expect(mockGetBlobClient).toHaveBeenCalledWith(blobName);
    expect(mockBlobClient.deleteIfExists).toHaveBeenCalledTimes(1);
    expect(result).toBe('mockResponse');
  });
});
