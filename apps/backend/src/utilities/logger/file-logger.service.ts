import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fspromises } from 'fs';
import * as path from 'path';

export const logPath = path.join(__dirname, '..', '..', '..', 'logs');
@Injectable()
export class FileLoggerService extends ConsoleLogger {
  async logToFile(entry: string) {
    const formattedEntry = `${new Date().toISOString()}\t${entry}\n`;
    // console.log(formattedEntry);
    // console.log(__dirname);
    try {
      if (!fs.existsSync(logPath)) {
        await fspromises.mkdir(logPath);
      }
      await fspromises.appendFile(path.join(logPath, 'app.log'), formattedEntry);
    } catch (e) {
      if (e instanceof Error) {
        // console.error(e.message);
      }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(message: any, context?: string) {
    const entry = `${context}\t${message}`;
    this.logToFile(entry);
    super.log(message, context);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: any, stackOrContext?: string) {
    const entry = `${stackOrContext}\t${message}`;
    this.logToFile(entry);
    super.error(message, stackOrContext);
  }
}
