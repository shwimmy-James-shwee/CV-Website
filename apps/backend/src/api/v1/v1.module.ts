import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
// import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from '../../database/database.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [DatabaseModule, UserModule, ProjectModule],
})
export class V1Module {}
