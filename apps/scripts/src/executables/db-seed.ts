/**
 * Called by `pnpm db:seed`
 */

import { logger } from '@/common/logger';

async function generateUsers(numOfUsers: number): Promise<void> {
  for (let i = 0; i < numOfUsers; i++) {
    logger.debug(`Index: ${i}`);
  }
}

generateUsers(10);
