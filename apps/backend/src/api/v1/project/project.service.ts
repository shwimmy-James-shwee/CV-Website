import { Injectable } from '@nestjs/common';
import { Prisma } from '@core/db';
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
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(id: string, addInclude: Prisma.UserInclude = {}) {
    return this.databaseService.user.findUnique({
      where: { id },
      include: addInclude,
    });
  }
  async findOneByEmail(loginEmail: string, addInclude: Prisma.UserInclude = {}) {
    return this.databaseService.user.findUnique({
      where: { loginEmail },
      include: addInclude,
    });
  }

  // async findUserBusinessUnits(userId: string): Promise<CurrentUserBusinessUnitsType[]> {
  //   return this.databaseService.businessUnit.findMany({
  //     where: {
  //       Members: {
  //         some: {
  //           userId,
  //         },
  //       },
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //     },
  //   });
  // }

  // async getAdminUsers(businessUnitId: string): Promise<AdminUsersType[]> {
  //   return this.databaseService.user.findMany({
  //     where: {
  //       MemberOfBusinessUnits: {
  //         some: {
  //           businessUnitId,
  //           roles: {
  //             has: MemberRole.ADMINISTRATOR,
  //           },
  //         },
  //       },
  //     },
  //     select: {
  //       id: true,
  //       firstName: true,
  //       lastName: true,
  //     },
  //   });
  // }
}
