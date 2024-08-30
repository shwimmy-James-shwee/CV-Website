import { Test, TestingModule } from '@nestjs/testing';
import { FileLoggerService } from './file-logger.service';
// import * as fs from 'fs';
// import { logPath } from './file-logger.service';

describe('FileLoggerService', () => {
  let service: FileLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileLoggerService]
    }).compile();

    service = module.get<FileLoggerService>(FileLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('it should log to file', async () => {
  //   const timeStamp = new Date().getTime();
  //   const logStr = `test ${timeStamp}`;
  //   await service.log(logStr, 'test');

  //   const logContent = fs.readFileSync(`${logPath}/app.log`, 'utf8');
  //   expect(logContent).toContain(logStr);
  // });

  // it('it should error to file', async () => {
  //   const timeStamp = new Date().getTime();
  //   const logStr = `error ${timeStamp}`;
  //   await service.log(logStr, 'error');

  //   const logContent = fs.readFileSync(`${logPath}/app.log`, 'utf8');
  //   expect(logContent).toContain(logStr);
  // });
});
