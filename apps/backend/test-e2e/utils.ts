import { BusinessUnit, Member, PrismaClient, UserActivityLog } from '@core/db';

import { User } from '@core/db';
import { seedUserData } from './__data__/user.data';
import { seedUserActivityLogData } from './__data__/user-activity-log.data';
import { seedBusinessUnitData, seedParentBusinessUnitData } from './__data__/business-unit.data';
let prisma = new PrismaClient();

global.prisma = prisma;
prisma = global.prisma;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function APIReturnObjectify(value: any): string {
  return JSON.parse(JSON.stringify(value));
}

export let seedUser: User;
export let seedUserActivityLog: UserActivityLog;
export let seedBusinessUnit: BusinessUnit;
export let seedParentBusinessUnit: BusinessUnit;
export let seedMember: Member;

export const testSeedSetup = async () => {
  seedUser = await prisma.user.create({
    data: seedUserData
  });

  seedUserActivityLog = await prisma.userActivityLog.create({
    data: { ...seedUserActivityLogData, User: { connect: { id: seedUser.id } } }
  });

  seedParentBusinessUnit = await prisma.businessUnit.create({ data: seedParentBusinessUnitData });
  seedBusinessUnit = await prisma.businessUnit.create({
    data: { ...seedBusinessUnitData, ParentBusinessUnit: { connect: { id: seedParentBusinessUnit.id } } }
  });

  seedMember = await prisma.member.create({
    data: {
      User: { connect: { id: seedUser.id } },
      BusinessUnit: { connect: { id: seedBusinessUnit.id } }
    }
  });
};

export const testResetDB = async () => {
  await prisma.$transaction([prisma.user.deleteMany()]);
  await prisma.$transaction([prisma.userActivityLog.deleteMany()]);
  await prisma.$transaction([prisma.businessUnit.deleteMany()]);
  await testSeedSetup();

  await prisma.$disconnect();
};
