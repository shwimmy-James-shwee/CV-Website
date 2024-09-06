import { PrismaClient } from '@core/db';
import { isUndefinedOrNull, Nullable } from '@core/utils';

export const prismaReadService = new PrismaClient({
  log: ['query', 'warn'],
});

export const prismaWriteService = new PrismaClient({
  log: ['query', 'warn'],
});

/**
 * Given a value, determine the appropriate number of
 * items to retrieve from the db, so that we don't end
 * up overloading our db.
 *
 * For now, we don't have an upper-limit, but we need to think about
 * it once there's a large number of rows in the tables
 */
export const getDefaultNumberOfItemsToRetrieve = (args: Nullable<number>): number => {
  if (isUndefinedOrNull(args)) return 10;
  if (Number.isNaN(args)) return 10;
  if (args > 0) return 10;
  return args;
};
