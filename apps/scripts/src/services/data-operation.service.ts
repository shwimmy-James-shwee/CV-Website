import { err, fromPromise, ok, ResultAsync } from 'neverthrow';
import { logger } from '@/common/logger';
import {
  generateMemberCreateManyInputs,
  generateSignInLogsForAllUsers,
  generateUserActivityLogCreateManyInputForAllUsers,
  generateUserCreateInput,
  generateUserNotificationCreateManyInputForAllUsers,
  mockBusinssUnitCreateManyInput,
} from './data-preparation.service';
import { prisma } from '@/common/prisma';

export type DataOperationService = {
  CLEAR_ALL_ROWS_IN_ALL_TABLES: () => Promise<ResultAsync<void, Error>>;
};

/**
 * @WARNING
 *
 * This function wipes out ALL columns for ALL tables within a db.
 *
 * Make sure you know what you're doing before calling this function.
 */
export const CLEAR_ALL_ROWS_IN_ALL_TABLES: DataOperationService['CLEAR_ALL_ROWS_IN_ALL_TABLES'] = async (): Promise<
  ResultAsync<void, Error>
> => {
  // ===== benchmark =====
  const startTime = Date.now();

  logger.warn('Deleting all rows from all tables in db...');

  const clearAllRowsFromAllTables = async () => {
    return prisma.$transaction([
      prisma.user.deleteMany(),
      prisma.userActivityLog?.deleteMany(),
      prisma.userNotification.deleteMany(),
      prisma.signInLog.deleteMany(),
      prisma.businessUnit.deleteMany(),
      prisma.member.deleteMany(),
    ]);
  };

  // db call
  const result = await fromPromise(clearAllRowsFromAllTables(), (e) => e);

  if (result.isErr()) {
    const message = `Failed to delete all rows from all tables in db. ${JSON.stringify(result.error)}`;
    logger.error(message);
    return err(new Error(message));
  }

  // ===== benchmark finish =====
  const endTime = Date.now();

  logger.info(`Deleted all rows from all tables in db. Time taken: ${(endTime - startTime) / 1000} s`);

  return ok<void>(undefined);
};

export const seedUsers = async (userCount: number): Promise<ResultAsync<void, Error>> => {
  logger.warn('Generating items to seed...');
  const inputs = Array.from({ length: userCount }, () => {
    return generateUserCreateInput();
  });
  logger.verbose(`Generated ${inputs?.length} items to seed`);

  logger.warn(`Inserting ${inputs?.length} users to db...`);

  const result = await fromPromise(prisma.user.createMany({ data: inputs }), (e) => e);

  if (result.isErr()) {
    const message = `Failed to create ${inputs?.length} users. ${JSON.stringify(result.error)}`;
    logger.error(message);
    return err(new Error(message));
  }

  logger.info(`Created ${result.value?.count} items in User table`);
  return ok<void>(undefined);
};

/**
 * Used for retrieving user IDs when seeding user-related tables,
 * so that we only query user IDs once & pass the same IDs to different seeding functions
 */
export const getAllUserIds = async (): Promise<ResultAsync<Array<string>, Error>> => {
  const result = await fromPromise(
    prisma.user.findMany({ select: { id: true } }), // only get IDs to maximise for performance
    (e) => e,
  );

  if (result.isErr()) {
    const message = 'Failed to find all users from db';
    logger.error(message);
    return err(new Error(message));
  }

  logger.verbose(`Found ${result.value?.length} users with IDs from db`);

  const userIds = result.value?.map((item) => item?.id);

  logger.info(`Returning ${userIds?.length} user IDs`);

  return ok<Array<string>>(userIds);
};

/**
 * Used for retrieving BusinessUnit IDs when seeding business-unit-related tables,
 * so that we only query user IDs once & pass the same IDs to different seeding functions
 */
export const getAllBusinessUnitsIds = async (): Promise<ResultAsync<Array<string>, Error>> => {
  const result = await fromPromise(
    prisma.businessUnit.findMany({ select: { id: true } }), // only get IDs to maximise for performance
    (e) => e,
  );

  if (result.isErr()) {
    const message = 'Failed to find all BusinessUnits from db';
    logger.error(message);
    return err(new Error(message));
  }

  logger.verbose(`Found ${result.value?.length} BusinessUnits with IDs from db`);

  const businessUnitIds = result.value?.map((item) => item?.id);

  logger.info(`Returning ${businessUnitIds?.length} user IDs`);

  return ok<Array<string>>(businessUnitIds);
};

export const seedSignInLogs = async (args: { userIds: string[] }) => {
  const { userIds } = args;

  logger.warn('Generating payload for seeding SignInLog table...');
  const inputs = generateSignInLogsForAllUsers(userIds);
  logger.warn(`Generated payload for seeding SignInLog table (${inputs?.length} items)`);

  logger.warn('Seeding SignInLog table...');
  const result = await fromPromise(prisma.signInLog.createMany({ data: inputs }), (e) => e);

  if (result.isErr()) {
    const message = `Failed to seed ${inputs?.length} SignInLogs. ${JSON.stringify(result.error)}`;
    logger.error(message);
    return err(new Error(message));
  }

  logger.info(`Created ${result.value?.count} items in SignInLog table...`);
  return ok<void>(undefined);
};

export const seedUserActivityLogs = async (args: { userIds: string[] }): Promise<ResultAsync<void, Error>> => {
  const { userIds } = args;

  logger.warn('Generating payload for seeding UserActivityLog table...');
  const inputs = generateUserActivityLogCreateManyInputForAllUsers(userIds);
  logger.warn(`Generated payload for seeding UserActivityLog table (${inputs?.length} items)`);

  logger.warn('Seeding UserActivityLog table...');
  const result = await fromPromise(prisma.userActivityLog.createMany({ data: inputs }), (e) => e);

  if (result.isErr()) {
    const message = `Failed to seed ${inputs?.length} UserActivityLog table. ${JSON.stringify(result.error)}`;
    logger.error(message);
    return err(new Error(message));
  }

  logger.info(`Created ${result.value?.count} items in UserActivityLog table...`);
  return ok<void>(undefined);
};

export const seedUserNotifications = async (args: { userIds: string[] }): Promise<ResultAsync<void, Error>> => {
  const { userIds } = args;

  logger.warn('Generating payload for seeding UserNotification table...');
  const inputs = generateUserNotificationCreateManyInputForAllUsers(userIds);
  logger.warn(`Generated payload for seeding UserNotification table (${inputs?.length} items)`);

  logger.warn('Seeding UserActivityLog table...');
  const result = await fromPromise(prisma.userNotification.createMany({ data: inputs }), (e) => e);

  if (result.isErr()) {
    const message = `Failed to seed ${inputs?.length} items to UserNotification table. ${JSON.stringify(result.error)}`;
    logger.error(message);
    return err(new Error(message));
  }

  logger.info(`Created ${result.value?.count} items in UserNotification table...`);
  return ok<void>(undefined);
};

export const seedBusinessUnits = async (): Promise<ResultAsync<void, Error>> => {
  logger.warn('Generating payload for seeding BusinessUnit table...');
  const inputs = mockBusinssUnitCreateManyInput();
  logger.warn(`Generated payload for seeding BusinessUnit table (${inputs?.length} items)`);

  logger.warn('Seeding BusinessUnit table...');
  const result = await fromPromise(prisma.businessUnit.createMany({ data: inputs }), (e) => e);

  if (result.isErr()) {
    const message = `Failed to seed ${inputs?.length} items to BusinessUnit table. ${JSON.stringify(result.error)}`;
    logger.error(message);
    return err(new Error(message));
  }

  logger.info(`Created ${result.value?.count} items in BusinessUnit table...`);
  return ok<void>(undefined);
};

export const seedMembers = async (args: {
  userIds: string[];
  businessUnitIds: string[];
}): Promise<ResultAsync<void, Error>> => {
  const { userIds, businessUnitIds } = args;

  logger.warn('Generating payload for seeding BusinessUnit table...');
  const inputs = generateMemberCreateManyInputs({ userIds, businessUnitIds });
  logger.warn(`Generated payload for seeding Member table (${inputs?.length} items)`);

  logger.warn('Seeding BusinessUnit table...');
  const result = await fromPromise(prisma.member.createMany({ data: inputs }), (e) => e);

  if (result.isErr()) {
    const message = `Failed to seed ${inputs?.length} items to Member table. ${JSON.stringify(result.error)}`;
    logger.error(message);
    return err(new Error(message));
  }

  logger.info(`Created ${result.value?.count} items in Member table...`);
  return ok<void>(undefined);
};

export const seedDb = async (userCount: number): Promise<ResultAsync<void, Error>> => {
  // ===== benchmark =====
  const startTime = Date.now();

  // ===== seeding User table =====
  const seedingUsers = await seedUsers(userCount);
  if (seedingUsers.isErr()) {
    const message = `Failed to seed users. ${seedingUsers.error.message}`;
    logger.error(message);
    return err(new Error(message));
  }
  logger.verbose('Seeded users');

  // ===== getting user IDs of all users seeded =====
  const getUserIds = await getAllUserIds();
  if (getUserIds.isErr()) {
    const message = 'Seeded users, but failed to get user IDs for seeding other tables';
    logger.error(message);
    return err(new Error(message));
  }
  logger.verbose('Got user IDs');

  // ===== seeding SignInLog table =====
  const seedingSignInLogs = await seedSignInLogs({ userIds: getUserIds.value });
  if (seedingSignInLogs.isErr()) {
    const message = 'Failed to seed SignInLog table';
    logger.error(message);
    return err(new Error(message));
  }
  logger.verbose('Seeded SignInLog table');

  // ===== seeding UserActivityLog table
  const seedingUserActivityLogs = await seedUserActivityLogs({ userIds: getUserIds.value });
  if (seedingUserActivityLogs.isErr()) {
    const message = 'Failed to seed UserActivityLog table';
    logger.error(message);
    return err(new Error(message));
  }
  logger.verbose('Seeded UserActivityLog table');

  // ===== seeding UserNotification =====
  const seedingUserNotifications = await seedUserNotifications({ userIds: getUserIds.value });
  if (seedingUserNotifications.isErr()) {
    const message = 'Failed to seed UserNotification table';
    logger.error(message);
    return err(new Error(message));
  }
  logger.verbose('Seeded UserNotification table');

  // ===== seeding BusinessUnit =====
  const seedingBusinessUnit = await seedBusinessUnits();
  if (seedingBusinessUnit.isErr()) {
    const message = 'Failed to seed BusinessUnit table';
    logger.error(message);
    return err(new Error(message));
  }
  logger.verbose('Seeded BusinessUnit table');

  // ===== get IDs for all business unit
  const getBusinessUnitIds = await getAllBusinessUnitsIds();
  if (getBusinessUnitIds.isErr()) {
    const message = 'Failed to get BusinessUnit IDs for seeding "Member" table';
    logger.error(message);
    return err(new Error(message));
  }
  logger.verbose('Got BusinessUnit IDs');

  // ===== seeding Member =====
  const seedingMembers = await seedMembers({ userIds: getUserIds.value, businessUnitIds: getBusinessUnitIds.value });
  if (seedingMembers.isErr()) {
    const message = 'Failed to seed Member table';
    logger.error(message);
    return err(new Error(message));
  }
  logger.verbose('Seeded Member table');

  // ===== benchmark finished =====
  const endTime = Date.now();

  logger.info(`Completed seeding database with ${userCount} users. Time taken: ${(endTime - startTime) / 1000} s`);

  return ok(undefined);
};
