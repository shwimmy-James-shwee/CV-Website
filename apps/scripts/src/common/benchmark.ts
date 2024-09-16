import { logger } from './logger';

/**
 * Given any function, it tells you how long it took for the function
 * to execute
 */
export const benchmarkPerformance = async <T>(func: Promise<T>): Promise<[T, number]> => {
  const start = performance.now();

  const result = await func;

  const end = performance.now();
  const timeTaken = end - start;

  logger.info(`Time taken: ${timeTaken / 1000} s`);

  return [result, timeTaken];
};
