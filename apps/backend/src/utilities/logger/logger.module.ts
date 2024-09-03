import { Module } from '@nestjs/common';
import { FileLoggerService } from './file-logger.service';
import { InsightLoggerService } from './insight-logger.service';

@Module({
  providers: [FileLoggerService, InsightLoggerService],
  exports: [FileLoggerService],
})
export class LoggerModule {}
