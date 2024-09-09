import { err, ok, Result } from 'neverthrow';
import { BusinessUnit } from '@/models/business-unit';
import { Member } from '@/models/member';
import { SignInLog } from '@/models/sign-in-log';
import { User } from '@/models/user';
import { UserActivityLog } from '@/models/user-activity-log';
import { UserNotification } from '@/models/user-notification';
import { arrayIsEmpty } from '@core/utils';
import { Invocable } from '@/types/common/io';
import { BaseLoggerArgs, logger, ProjectFileName } from '@/utilities/logger/logger';

const file: ProjectFileName = 'crud.service.ts';

export const USER_RELATIONAL_FIELDS: Array<keyof User> = [
  'SignInLogs',
  'UserActivityLogs',
  'UserNotifications',
  'MemberOfBusinessUnits',
];
export const USER_NOTIFICATION_RELATIONAL_FIELDS: Array<keyof UserNotification> = ['User'];
export const SIGN_IN_LOG_RELATIONAL_FIELDS: Array<keyof SignInLog> = ['User'];
export const USER_AVTIVITY_LOG_RELATIONAL_FIELDS: Array<keyof UserActivityLog> = ['User'];
export const BUSINESS_UNIT_LOG_RELATIONAL_FIELDS: Array<keyof BusinessUnit> = [
  'ParentBusinessUnit',
  'features',
  'Members',
  'ChildBusinessUnits',
];
export const MEMBER_LOG_RELATIONAL_FIELDS: Array<keyof Member> = ['User', 'BusinessUnit'];

export const relationFields = [
  ...USER_RELATIONAL_FIELDS,
  ...USER_NOTIFICATION_RELATIONAL_FIELDS,
  ...SIGN_IN_LOG_RELATIONAL_FIELDS,
  ...USER_AVTIVITY_LOG_RELATIONAL_FIELDS,
  ...BUSINESS_UNIT_LOG_RELATIONAL_FIELDS,
  ...MEMBER_LOG_RELATIONAL_FIELDS,
  'items',
] as const;
export type RelationField = (typeof relationFields)[number];

export type FieldsRequested = {
  mainFields: string[];
} & {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [key in RelationField]?: FieldsRequested;
};

export const entityNames = [
  'User',
  'BusinessUnit',
  'UserNotification',
  'Member',
  'SignInLog',
  'UserActivityLog',
] as const;
export type EntityName = (typeof entityNames)[number];

/**
 * Given a "FieldsRequested" object, we check if "mainFields" has at least 1 item.
 *
 * When making queries to DB, if we don't specify any columns to query from the table,
 * the query will fail. Therefore, we enforce all "FieldsRequested" object to have at least 1 item
 */
export const validateFieldsRequested = (dto: Invocable<FieldsRequested>): Result<void, Error> => {
  const { requestId, args } = dto;

  const { mainFields } = args;

  const baseLoggerArgs: BaseLoggerArgs = {
    requestId,
    file,
    scope: validateFieldsRequested.name,
  };

  logger.warn({ ...baseLoggerArgs, message: 'Validating "mainFields"...' });
  if (arrayIsEmpty(mainFields)) {
    const message = '"mainFields" must contain at least 1 item';
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }
  logger.warn({ ...baseLoggerArgs, message: 'Validatd "mainFields", no issues' });

  return ok<void>(undefined);
};
