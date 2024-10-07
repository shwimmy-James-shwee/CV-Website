import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
// import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from '../../database/database.module';

@Module({
  imports: [DatabaseModule, UserModule],
})
export class V1Module {}
