/**
 * Called by `pnpm db:clear`
 */

import { CLEAR_ALL_ROWS_IN_ALL_TABLES } from '@/services/data-operation.service';

CLEAR_ALL_ROWS_IN_ALL_TABLES();
