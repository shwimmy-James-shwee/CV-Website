/**
 * Called by `pnpm db:seed`
 */

import { benchmarkPerformance } from '@/common/benchmark';
import { seedDb } from '@/services/data-operation.service';

benchmarkPerformance(seedDb(5000));
