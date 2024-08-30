/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ConsoleLogger, Injectable, OnModuleInit } from '@nestjs/common';
import { TelemetryClient } from 'applicationinsights';
// import * as AppInsights from 'applicationinsights';
import { env } from '../../config/env';
import { SeverityLevel } from 'applicationinsights/out/Declarations/Contracts';

import * as fs from 'fs';
import { promises as fspromises } from 'fs';
import * as path from 'path';

@Injectable()
export class InsightLoggerService extends ConsoleLogger implements OnModuleInit {
  private readonly logger =
    env.NODE_ENV === 'test' || env.NODE_ENV === 'local'
      ? {
          trackTrace: ({}: any) => {},
          trackException: ({}: any) => {}
        }
      : new TelemetryClient(env.APPLICATIONINSIGHTS_CONNECTION_STRING);

  async onModuleInit() {}

  async logToFile(entry: string) {
    const formattedEntry = `${new Date().toISOString()}\t${entry}\n`;
    const logFilePath = path.join(__dirname, '..', '..', '..', 'logs');
    try {
      if (!fs.existsSync(logFilePath)) {
        await fspromises.mkdir(logFilePath);
      }
      await fspromises.appendFile(
        path.join(logFilePath, `${new Date().toISOString().split('T')[0]}.log`),
        formattedEntry
      );
    } catch (e) {
      if (e instanceof Error) {
        // console.error(e.message);
      }
    }
  }

  formatMessageForLogger<T>(message: T, optionalParams: T) {
    if (typeof message === 'string') {
      return `${optionalParams} ${message}`;
    } else if (typeof message === 'object') {
      return JSON.stringify({ context: optionalParams, ...message });
    } else {
      return message;
    }
  }
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    this.logger.trackTrace({
      message: this.formatMessageForLogger(message, optionalParams),
      severity: SeverityLevel.Information
    });
    this.logToFile(`${optionalParams} ${message}`);
    super.log(message, ...optionalParams);
  }

  /**
   * Write a 'fatal' level log.
   */
  fatal(message: any, ...optionalParams: any[]) {
    this.logger.trackException({
      exception: this.formatMessageForLogger(message, optionalParams),
      severity: SeverityLevel.Critical
    });
    this.logToFile(`${optionalParams} ${message}`);
    super.error(message, ...optionalParams);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this.logger.trackException({
      exception: this.formatMessageForLogger(message, optionalParams),
      severity: SeverityLevel.Error
    });
    this.logToFile(this.formatMessageForLogger(message, optionalParams));
    super.error(message, ...optionalParams);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this.logger.trackTrace({
      message: this.formatMessageForLogger(message, optionalParams),
      severity: SeverityLevel.Warning
    });
    this.logToFile(this.formatMessageForLogger(message, optionalParams));
    super.warn(message, ...optionalParams);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    this.logger.trackTrace({
      message: this.formatMessageForLogger(message, optionalParams),
      severity: SeverityLevel.Verbose
    });
    this.logToFile(this.formatMessageForLogger(message, optionalParams));
    super.debug(message, ...optionalParams);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    this.logger.trackTrace({
      message: this.formatMessageForLogger(message, optionalParams),
      severity: SeverityLevel.Verbose
    });
    this.logToFile(this.formatMessageForLogger(message, optionalParams));
    super.verbose(message, ...optionalParams);
  }
}
