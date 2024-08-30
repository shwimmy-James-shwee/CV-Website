import { Module } from '@nestjs/common';
import { UserActivityLogController } from './user-activity-log.controller';
import { UserActivityLogService } from './user-activity-log.service';
import { DatabaseModule } from '../../../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserActivityLogController],
  providers: [UserActivityLogService]
})
export class UserActivityLogModule {}
