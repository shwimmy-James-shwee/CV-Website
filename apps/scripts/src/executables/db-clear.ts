/**
 * Called by `pnpm db:clear`
 */

import { CLEAR_ALL_ROWS_IN_ALL_TABLES } from '@/services/data-operation.service';
import { prisma } from '@/common/prisma';

CLEAR_ALL_ROWS_IN_ALL_TABLES(prisma);
