import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from '../../database/database.module';
import { BusinessUnitModule } from './business-unit/business-unit.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    BusinessUnitModule,
    RouterModule.register([{ path: 'admin', children: [UserModule, BusinessUnitModule] }])
  ]
})
export class AdminModule {}
