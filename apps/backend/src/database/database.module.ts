import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [{ provide: DatabaseService, useValue: DatabaseService.getInstance() }],
  exports: [DatabaseService],
})
export class DatabaseModule {}
