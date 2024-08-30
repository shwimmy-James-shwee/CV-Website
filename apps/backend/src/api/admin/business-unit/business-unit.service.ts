import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../../../database/database.service';
@Injectable()
export class BusinessUnitService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll() {
    return this.databaseService.businessUnit.findMany();
  }

  async findOne(id: string, addInclude: Prisma.BusinessUnitInclude = {}) {
    return this.databaseService.businessUnit.findUnique({
      where: { id },
      include: addInclude,
    });
  }
}
