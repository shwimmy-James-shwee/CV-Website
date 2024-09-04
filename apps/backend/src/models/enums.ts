import { registerEnumType } from '@nestjs/graphql';

// This file re-declares all the enums from prisma schema
// @nestjs/graphql needs to access enums declared within
// this project in order to generate enum values on to the
// GraphQL schema, this means we cannot use the same enums
// directly from '@core/db'

export enum NotificationFrequency {
  DISABLED,
  REALTIME,
  HOURLY,
  DAILYEVE,
  DAILYMORN,
  WEEKLY,
}
registerEnumType(NotificationFrequency, {
  name: `NotificationFrequency`,
});

export enum UserRole {
  STANDARD_USER,
  ADMINISTRATOR,
}
registerEnumType(UserRole, {
  name: `UserRole`,
});

export enum NotificationStatus {
  NOTIFIED,
  READ,
}
registerEnumType(NotificationStatus, {
  name: `NotificationStatus`,
});

export enum MemberRole {
  ADMINISTRATOR,
  STANDARD,
}
registerEnumType(MemberRole, {
  name: `MemberRole`,
});

export enum BusinessUnitType {
  TEAM,
  DEPARTMENT,
  DIVISION,
  COMPANY,
}
registerEnumType(BusinessUnitType, {
  name: `BusinessUnitType`,
});

export enum Feature {
  BASIC,
  BASIC_REPORTING,
}
registerEnumType(Feature, {
  name: `Feature`,
});
