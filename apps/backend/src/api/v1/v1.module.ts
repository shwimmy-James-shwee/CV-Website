import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
// import { RouterModule } from '@nestjs/core';
import { DatabaseModule } from '../../database/database.module';
import { ProjectModule } from './project/project.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [DatabaseModule, UserModule, ProjectModule, ContactModule],
})
export class V1Module {}
