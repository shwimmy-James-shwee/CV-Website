import { err, fromPromise, ok, ResultAsync } from 'neverthrow';
import { PrismaClient } from '@core/db';
import { logger } from '@/common/logger';

export type DataOperationService = {
  CLEAR_ALL_ROWS_IN_ALL_TABLES: (prisma: PrismaClient) => Promise<ResultAsync<void, Error>>;
};

/**
 * @WARNING
 *
 * This function wipes out ALL columns for ALL tables within a db.
 *
 * Make sure you know what you're doing before calling this function.
 */
export const CLEAR_ALL_ROWS_IN_ALL_TABLES: DataOperationService['CLEAR_ALL_ROWS_IN_ALL_TABLES'] = async (
  prisma: PrismaClient,
): Promise<ResultAsync<void, Error>> => {
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

  logger.info(`Function ${CLEAR_ALL_ROWS_IN_ALL_TABLES}() succeeded`);
  return ok<void>(undefined);
};
