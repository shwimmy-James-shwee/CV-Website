import { err, fromPromise, ok, ResultAsync } from 'neverthrow';
import { User } from '@core/db';
import { logger } from '@/common/logger';
import { generateUserCreateInput } from './data-preparation.service';
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

export const seedUsers = async (userCount: number): Promise<ResultAsync<Map<string, User>, Error>> => {
  logger.warn('Generating items to seed...');
  const inputs = Array.from({ length: userCount }, () => {
    return generateUserCreateInput();
  });
  logger.verbose(`Generated ${inputs?.length} items to seed`);

  const itemsCreated = new Map<string, User>();

  logger.warn(`Inserting ${inputs?.length} users to db...`);

  const result = await fromPromise(prisma.user.createMany({ data: inputs }), (e) => e);

  if (result.isErr()) {
    const message = `Failed to create ${inputs?.length} users. ${JSON.stringify(result.error)}`;
    logger.error(message);
    return err(new Error(message));
  }

  logger.info(`Created ${result.value?.count} users in db.`);
  return ok<Map<string, User>>(itemsCreated);
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

export const seedDb = async (userCount: number): Promise<ResultAsync<void, Error>> => {
  // ===== seeding users =====
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

  return ok(undefined);
};
