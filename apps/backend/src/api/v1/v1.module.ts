import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { UserActivityLogModule } from './user-activity-log/user-activity-log.module';
import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    UserActivityLogModule,
    RouterModule.register([{ path: 'v1', children: [UserModule, UserActivityLogModule] }])
  ]
})
export class V1Module {}
