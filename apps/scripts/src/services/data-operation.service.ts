import { err, fromPromise, ok, ResultAsync } from 'neverthrow';
import { logger } from '@/common/logger';
import {
  generateSignInLogsForAllUsers,
  generateUserActivityLogCreateManyInputForAllUsers,
  generateUserCreateInput,
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
  logger.warn('Clearing db - Deleting all rows in all columns...');

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
    const message = `Function ${CLEAR_ALL_ROWS_IN_ALL_TABLES.name}() failed. ${JSON.stringify(result.error)}`;
    logger.error(message);
    return err(new Error(message));
  }

  logger.info(`Function ${CLEAR_ALL_ROWS_IN_ALL_TABLES.name}() succeeded`);
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

  logger.info(`Created ${result.value?.count} items in User table...`);
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

export const seedUserActivityLogs = async (args: { userIds: string[] }) => {
  // generateUserActivityLogCreateManyInputForAllUsers
  const { userIds } = args;

  logger.warn('Generating payload for seeding UserActivityLog table...');
  const inputs = generateUserActivityLogCreateManyInputForAllUsers(userIds);
  logger.warn(`Generated payload for seeding UserActivityLog table (${inputs?.length} items)`);

  logger.warn('Seeding UserActivityLog table...');
  const result = await fromPromise(prisma.userActivityLog.createMany({ data: inputs }), (e) => e);

  if (result.isErr()) {
    const message = `Failed to seed ${inputs?.length} UserActivityLog. ${JSON.stringify(result.error)}`;
    logger.error(message);
    return err(new Error(message));
  }

  logger.info(`Created ${result.value?.count} items in UserActivityLog table...`);
  return ok<void>(undefined);
};

export const seedDb = async (userCount: number): Promise<ResultAsync<void, Error>> => {
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

  return ok(undefined);
};
