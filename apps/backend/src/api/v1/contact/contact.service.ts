import { Injectable } from '@nestjs/common';
import { ContactUsNotification } from '@core/db';
import { DatabaseService } from '../../../database/database.service';

export type CurrentUserBusinessUnitsType = {
  id: string;
  name: string;
};

export type AdminUsersType = {
  id: string;
  firstName: string;
  lastName: string;
};

@Injectable()
export class ContactService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<ContactUsNotification[]> {
    return this.databaseService.contactUsNotification.findMany();
  }
}
