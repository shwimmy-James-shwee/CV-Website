import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../../database/database.module';
import { ContactMeController } from './contact.controller';
import { ContactService } from './contact.service';

@Module({
  imports: [DatabaseModule],
  controllers: [ContactMeController],
  providers: [ContactService],
})
export class ContactModule {}
