// import NodeClam from 'clamscan';
// import { mockFunction } from '../../test-unit/test-utils';
// import { AntivirusService } from './antivirus.service';
// import { BadRequestException } from '@nestjs/common';
describe('AntivirusService', () => {
  // let antivirusService: AntivirusService;

  beforeEach(() => {
    // antivirusService = new AntivirusService();
    // mockFunction(NodeClam, 'init', { scanStream: jest.fn() });
  });
  it('dummy', () => {
    expect(1 + 1).toBe(2);
  });
  // it('should scan virus-free file', async () => {
  //   // Create a mock upload file
  //   const mockFile = {
  //     buffer: Buffer.from('This is a mock file content'),
  //   } as unknown as Express.Multer.File;
  //   // Mock the clamscan object
  //   // const mockClamscan = {
  //   //   scanStream: jest.fn().mockResolvedValue({ isInfected: false, file: 'mockFile.txt' }),
  //   // };
  //   // Mock the getClam method to return the mock clamscan object
  //   // antivirusService.getClam = jest.fn().mockResolvedValue(mockClamscan);

  //   await expect(antivirusService.scanVirusFilePath(mockFile)).resolves.not.toThrow();
  // });

  // it('should throw BadRequestException for infected file', async () => {
  //   // Create a mock upload file
  //   const mockFile = {
  //     buffer: Buffer.from('This is an infected file content'),
  //   } as unknown as Express.Multer.File;
  //   // Mock the clamscan object
  //   // const mockClamscan = {
  //   //   scanStream: jest.fn().mockResolvedValue({ isInfected: true, file: 'infectedFile.txt' }),
  //   // };
  //   // // Mock the getClam method to return the mock clamscan object
  //   // antivirusService.getClam = jest.fn().mockResolvedValue(mockClamscan);

  //   await expect(antivirusService.scanVirusFilePath(mockFile)).rejects.toThrow(BadRequestException);
  // });
});
