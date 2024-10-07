import { err, fromPromise, ok, ResultAsync } from 'neverthrow';
import { logger } from '@/common/logger';
import { generateUserCreateInput } from './data-preparation.service';
import { prisma } from '@/common/prisma';
import { teamMembers } from './data-preparation-team.service';

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
  logger.warn('Deleting all rows from all tables in db...');

  const clearAllRowsFromAllTables = async () => {
    return prisma.$transaction([prisma.user.deleteMany(), prisma.signInLog.deleteMany()]);
  };

  // db call
  const result = await fromPromise(clearAllRowsFromAllTables(), (e) => e);

  if (result.isErr()) {
    const message = `Failed to delete all rows from all tables in db. ${JSON.stringify(result.error)}`;
    logger.error(message);
    return err(new Error(message));
  }

  logger.info('Deleted all rows from all tables in db.');

  return ok<void>(undefined);
};

export const seedUsers = async (userCount: number): Promise<ResultAsync<void, Error>> => {
  logger.warn(`Generating ${userCount} items to seed...`);
  const inputs = Array.from({ length: userCount }, () => {
    return generateUserCreateInput();
  });
  logger.verbose(`Generated ${inputs?.length} items to seed`);

  logger.warn('Generating team members to seed...');
  logger.info(`Generated ${teamMembers?.length} team members to seed`);

  const totalInputs = [...inputs, ...teamMembers];
  logger.warn(`Inserting ${totalInputs?.length} users to db...`);

  const result = await fromPromise(prisma.user.createMany({ data: totalInputs }), (e) => e);
  if (result.isErr()) {
    const message = `Failed to create ${totalInputs?.length} users. ${JSON.stringify(result.error)}`;
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

  logger.info(`Completed seeding database with ${userCount} users`);

  return ok(undefined);
};
