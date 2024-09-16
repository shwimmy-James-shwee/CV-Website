import * as c from 'colorette';

export const logger = {
  info: (args: string) => console.log(c.green(`[INFO] ${args}`)),
  error: (args: string) => console.log(c.red(`[ERROR] ${args}`)),
  warn: (args: string) => console.log(c.yellow(`[WARN] ${args}`)),
  debug: (args: string) => console.log(c.blue(`[DEBUG] ${args}`)),
  verbose: (args: string) => console.log(c.cyan(`[VERBOSE] ${args}`)),
};
