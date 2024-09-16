/**
 * Called by `pnpm db:clear`
 */

import { benchmarkPerformance } from '@/common/benchmark';
import { CLEAR_ALL_ROWS_IN_ALL_TABLES } from '@/services/data-operation.service';

benchmarkPerformance(CLEAR_ALL_ROWS_IN_ALL_TABLES());
