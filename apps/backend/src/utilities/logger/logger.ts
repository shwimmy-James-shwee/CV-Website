import { Logger } from '@nestjs/common';

export class CustomLogger extends Logger {
  log(args: LoggerArgs) {
    super.log(constructLogMessage(args));
  }

  error(args: LoggerArgs) {
    super.error(constructLogMessage(args));
  }

  warn(args: LoggerArgs) {
    super.warn(constructLogMessage(args));
  }

  debug(args: LoggerArgs) {
    super.debug(constructLogMessage(args));
  }

  verbose(args: LoggerArgs) {
    super.verbose(constructLogMessage(args));
  }

  fatal(args: LoggerArgs) {
    super.fatal(constructLogMessage(args));
  }
}

export const logger = new CustomLogger();

export const constructLogMessage = (args: LoggerArgs): string => {
  const { file, scope, requestId, message } = args;
  return `[${file}] (${scope}) ${message} | Request ID: ${requestId}`;
};

// ======= Constructing File Names ========

export const repositoryNames = ['user'] as const;
type RepositoryName = (typeof repositoryNames)[number];
type RepositoryFile = `${RepositoryName}.repository.ts`;

export const serviceNames = ['crud', 'graphql', 'prisma', 'user'] as const;
type ServiceName = (typeof serviceNames)[number];
type ServiceFile = `${ServiceName}.service.ts`;

export const resolverNames = ['user'] as const;
type ResolverName = (typeof resolverNames)[number];
type ResolverFile = `${ResolverName}.resolver.ts`;

export type ProjectFileName = RepositoryFile | ServiceFile | ResolverFile; // more to add when needed

// ======= Logger Inputs ======

export type LoggerArgs = {
  /** ID of the API request that triggered the logic where our log is located */
  requestId: string;

  /** Name of the file where our logs are located */
  file: ProjectFileName;

  /** Name of the function where our logs are located. This field is named "scope" instead of "function" on purpose, so that it doesn't conflict with the built-in "function" keyword in JS */
  scope: string;

  /** Actual log message */
  message: string;
};

export type BaseLoggerArgs = Pick<LoggerArgs, 'requestId' | 'file' | 'scope'>;
