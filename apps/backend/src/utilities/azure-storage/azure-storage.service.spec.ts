import { Test, TestingModule } from '@nestjs/testing';
import { AzureStorageService } from './azure-storage.service';
import * as azStorage from '@azure/storage-blob';
import * as azQueueStorage from '@azure/storage-queue';
import { mockFunction } from '../../test-unit/test-utils';
import { InternalServerErrorException } from '@nestjs/common';

// import * as fs from 'fs';
// import { logPath } from './file-logger.service';

describe('AzureStorageService', () => {
  let service: AzureStorageService;

  beforeEach(async () => {
    mockFunction(azStorage, 'BlobServiceClient', {
      getContainerClient: jest.fn().mockReturnValue({
        getBlockBlobClient: jest.fn((blobname: string) => {
          if (blobname.includes('testfail')) {
            return {
              download: jest.fn().mockReturnValue({
                _response: { status: 500 }
              })
            };
          }
          return {
            uploadData: jest.fn((bufferVal: Buffer) => {
              if (bufferVal.byteLength === 100) {
                return { _response: { status: 500 } };
              }
              return { _response: { status: 201 } };
            }),
            url: 'https://tpldatastorage.blob.core.windows.net/tpldatastorage-blob/uploadfiles/61e13b829f5f96d0a1dad1bc1bc08d65',
            download: jest.fn().mockReturnValue({
              _response: { status: 200 },
              readableStreamBody: new ReadableStream()
            })
          };
        })
      })
    });

    mockFunction(azStorage, 'StorageSharedKeyCredential', {
      value: jest.fn().mockReturnValue('test'),
      configurable: true,
      writable: true
    });

    mockFunction(azQueueStorage, 'QueueClient', {
      sendMessage: jest.fn().mockReturnValue('')
    });

    // Object.defineProperty(utils, 'encrypt', {
    //   value: jest.fn(),
    // });

    const module: TestingModule = await Test.createTestingModule({
      providers: [AzureStorageService]
    }).compile();

    service = module.get<AzureStorageService>(AzureStorageService);
  });

  // it('should be defined', () => {
  //   expect(service).toBeDefined();
  // });

  it('should be able to do upload', async () => {
    expect(
      await service.uploadData(
        {
          filename: 'test.pdf',
          mimetype: 'application/pdf',
          size: 1000,
          buffer: Buffer.alloc(1024, '.')
        } as Express.Multer.File,
        'test'
      )
    ).toEqual(
      'https://tpldatastorage.blob.core.windows.net/tpldatastorage-blob/uploadfiles/61e13b829f5f96d0a1dad1bc1bc08d65'
    );
  });

  it('should be able to handle fail upload', async () => {
    await expect(
      service.uploadData(
        {
          filename: 'test.pdf',
          mimetype: 'application/pdf',
          size: 100,
          buffer: Buffer.alloc(100, '.') // pass in 100 bytes buffer to trigger 500 status
        } as Express.Multer.File,
        'test'
      )
    ).rejects.toThrow(InternalServerErrorException);
  });

  it('should be able to do upload', async () => {
    const dummyEmail = {
      id: 'id',
      sentTo: ['email@email.com'],
      header: 'header',
      content: 'content'
    };
    await service.addEmailToQueue(dummyEmail);
  });

  it('should be able to do download', async () => {
    const readableStream = await service.downloadData('test');
    expect(readableStream).toBeInstanceOf(ReadableStream);
  });

  it('should be able to handle fail download', async () => {
    expect(service.downloadData('testfail')).rejects.toThrow(InternalServerErrorException);
  });
});
