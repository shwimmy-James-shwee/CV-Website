// import { Injectable } from '@nestjs/common';
// import { DatabaseService } from '../../../database/database.service';
// import { Prisma } from '@core/db';

// @Injectable()
// export class UserActivityLogService {
//   constructor(private readonly databaseService: DatabaseService) {}

//   async create(
//     createUserActivityLogDto: Prisma.UserActivityLogCreateInput,
//     addInclude: Prisma.UserActivityLogInclude = {},
//   ) {
//     return this.databaseService.userActivityLog.create({ data: createUserActivityLogDto, include: addInclude });
//   }

//   async findAll(orderBy: Prisma.UserActivityLogOrderByWithRelationInput) {
//     return this.databaseService.userActivityLog.findMany({ orderBy: orderBy });
//   }

//   async findOne(where: Prisma.UserActivityLogWhereInput, addInclude: Prisma.UserActivityLogInclude = {}) {
//     return this.databaseService.userActivityLog.findFirst({ where: where, include: addInclude });
//   }

//   async update(id: number, updateUserActivityLogDto: Prisma.UserActivityLogUpdateInput) {
//     return this.databaseService.userActivityLog.update({
//       where: { id },
//       data: updateUserActivityLogDto,
//     });
//   }

//   async findAllAggregateBy(byCondition: Prisma.UserActivityLogScalarFieldEnum) {
//     return this.databaseService.userActivityLog.groupBy({
//       by: [byCondition],
//       _sum: { eventDuration: true },
//     });
//   }
//   async findAllUniqueUserIdEmails() {
//     return this.databaseService.user.findMany({
//       select: { id: true, loginEmail: true },
//     });
//   }
// }
