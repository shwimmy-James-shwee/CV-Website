import { BusinessUnit } from '@/models/business-unit';
import { Member } from '@/models/member';
import { SignInLog } from '@/models/sign-in-log';
import { User } from '@/models/user';
import { UserActivityLog } from '@/models/user-activity-log';
import { UserNotification } from '@/models/user-notification';

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
  [key in RelationField]?: FieldsRequested;
};

// const hahah: FieldsRequested = {
//     mainFields: ['id', 'firkjas', 'lasrname'],
//     'UserActivityLogs': {
//         mainFields: ['id', 'envturl'],
//     },
//     'SignInLogs':
// }

export const entityNames = [
  'User',
  'BusinessUnit',
  'UserNotification',
  'Member',
  'SignInLog',
  'UserActivityLog',
] as const;
export type EntityName = (typeof entityNames)[number];
