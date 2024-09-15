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

  // db call
  const result = await fromPromise(
    prisma.$executeRawUnsafe(`
        DO
        $$
        DECLARE
          r RECORD;
        BEGIN
          -- Iterate over each table and truncate it
          FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
            EXECUTE 'TRUNCATE TABLE ' || quote_ident(r.tablename) || ' CASCADE';
          END LOOP;
        END
        $$;
      `),
    (e) => e,
  );

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

  logger.warn(`Inserting ${inputs?.length} items to db...`);

  for await (const input of inputs) {
    logger.warn(`Inserting item (${input?.firstName} ${input?.lastName})...`);

    // db call
    const result = await fromPromise(prisma.user.create({ data: input }), (e) => e);

    if (result.isErr()) {
      const message = `Failed to insert item (${input?.firstName} ${input?.lastName}). ${JSON.stringify(result.error)}`;
      logger.error(message);
      continue;
    }

    logger.verbose(`Inserted item (${input?.firstName} ${input?.lastName}) to db`);
    itemsCreated.set(result.value?.id, result.value);
  }

  logger.info(`Inserted ${itemsCreated.size} items to db.`);
  return ok<Map<string, User>>(itemsCreated);
};

export const seedDb = async (userCount: number): Promise<ResultAsync<void, Error>> => {
  seedUsers(userCount);
  return ok(undefined);
};
