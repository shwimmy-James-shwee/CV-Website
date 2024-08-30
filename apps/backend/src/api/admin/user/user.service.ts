import { Injectable } from '@nestjs/common';
import { Prisma, UserRole } from '@core/db';
import { DatabaseService } from '../../../database/database.service';
@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.UserCreateInput, addInclude: Prisma.UserInclude = {}) {
    return this.databaseService.user.create({
      data: createEmployeeDto,
      include: addInclude
    });
  }

  async findAll(role?: UserRole) {
    if (role)
      return this.databaseService.user.findMany({
        where: { roles: { has: role } }
      });

    return this.databaseService.user.findMany();
  }

  async findOne(id: string, addInclude: Prisma.UserInclude = {}) {
    return this.databaseService.user.findUnique({
      where: { id },
      include: addInclude
    });
  }
  async findOneByEmail(loginEmail: string, addInclude: Prisma.UserInclude = {}) {
    return this.databaseService.user.findUnique({
      where: { loginEmail },
      include: addInclude
    });
  }

  async update(id: string, updateEmployeeDto: Prisma.UserUpdateInput, addInclude: Prisma.UserInclude = {}) {
    return this.databaseService.user.update({
      where: { id },
      data: updateEmployeeDto,
      include: addInclude
    });
  }

  async remove(id: string) {
    return this.databaseService.user.delete({ where: { id } });
  }

  async createSignInLog(createSignInLogDto: Prisma.SignInLogCreateInput) {
    return this.databaseService.signInLog.create({ data: createSignInLogDto });
  }
}
