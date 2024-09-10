import {
  BusinessUnit,
  BusinessUnitType,
  Feature,
  Member,
  MemberRole,
  NotificationFrequency,
  NotificationStatus,
  SignInLog,
  User,
  UserActivityLog,
  UserNotification,
  UserRole,
} from '@core/db';
import * as f from '@ngneat/falso';

/**
 * Helper functions to generate random indexes
 */
// Generate a random number between 2 ranges (min and max included)
function generateRandomIndex(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateBiasedRandomBinaryIndex(biasThreshold: number): number {
  if (Math.random() < biasThreshold) {
    return 1;
  }
  return 0;
}

function generateBiasedRandomBool(biasThreshold: number): boolean {
  if (Math.random() < biasThreshold) {
    return true;
  }
  return false;
}

// Generates a random array of object (type T) with no duplicates
function generateRandomLengthObjectOfArrayUnique<T>(length: number, callback: () => T): T[] {
  const objs = new Set<T>();
  for (let i = 0; i < length; i++) {
    objs.add(callback());
  }
  return Array.from(objs);
}

/**
 * Functions to generate Enums variants randomly
 */
// Should randomly generate STANDARD_USER 95% of the time and rest ADMINISTRATOR
function getUserRole(): UserRole {
  const randomIdx = generateBiasedRandomBinaryIndex(0.05);
  const randomEnum = Object.keys(UserRole)[randomIdx];
  return randomEnum as UserRole;
}

// Should randomly generate STANDARD 95% of the time and rest ADMINISTRATOR
function getMemberRole(): MemberRole {
  const randomIdx = generateBiasedRandomBinaryIndex(0.05);
  const randomEnum = Object.keys(MemberRole)[randomIdx];
  return randomEnum as MemberRole;
}

function getNotificationFreqRand(): NotificationFrequency {
  const enumLength = Object.keys(NotificationFrequency).length - 1;
  const randomIdx = generateRandomIndex(0, enumLength);
  const randomEnum = Object.keys(NotificationFrequency)[randomIdx];
  return randomEnum as NotificationFrequency;
}

function getNotificationStatusRand(): NotificationStatus {
  const enumLength = Object.keys(NotificationStatus).length - 1;
  const randomIdx = generateRandomIndex(0, enumLength);
  const randomEnum = Object.keys(NotificationStatus)[randomIdx];
  return randomEnum as NotificationStatus;
}

function getFeatureRand(): Feature {
  const enumLength = Object.keys(Feature).length - 1;
  const randomIdx = generateRandomIndex(0, enumLength);
  const randomEnum = Object.keys(Feature)[randomIdx];
  return randomEnum as Feature;
}

function getBusinessUnitTypeRand(): BusinessUnitType {
  const enumLength = Object.keys(BusinessUnitType).length - 1;
  const randomIdx = generateRandomIndex(0, enumLength);
  const randomEnum = Object.keys(BusinessUnitType)[randomIdx];
  return randomEnum as BusinessUnitType;
}

/**
 * User
 */
export function generateUser(): User {
  return {
    id: f.randUuid(),
    externalOid: f.randUuid(),
    loginEmail: f.randEmail(),
    firstName: f.randFirstName(),
    lastName: f.randLastName(),
    isSuperAdmin: generateBiasedRandomBool(0.01),
    roles: [getUserRole()],
    avatarUrl: f.randUrl(),
    thumbnailPhoto: [f.randNumber()],
    timeZoneOffSet: `${f.randNumber()}`,
    timeZone: f.randTimeZone(),
    notificationFrequency: getNotificationFreqRand(),
    createdAt: f.randPastDate({ years: 3 }),
    updatedAt: f.randPastDate({ years: 3 }),
  };
}

/**
 * User Notification
 */
export function generateUserNotification(userId: string): UserNotification {
  return {
    id: f.randNumber(),
    status: generateRandomLengthObjectOfArrayUnique(10, getNotificationStatusRand),
    message: f.randPhrase(),
    createdAt: f.randPastDate({ years: 3 }),
    updatedAt: f.randPastDate({ years: 3 }),
    userId: userId,
    additionalAttribute: f.randJSON(),
  };
}

/**
 * SignInLog
 */
export function generateSignInLog(userId: string): SignInLog {
  return {
    id: f.randNumber(),
    userId: userId,
    signInDateTime: new Date(),
    createdAt: f.randPastDate({ years: 3 }),
    updatedAt: f.randPastDate({ years: 3 }),
  };
}

/**
 * User Activity Log
 */
export function generateUserActivityLog(userId: string): UserActivityLog {
  return {
    id: f.randNumber(),
    userId: userId,
    sessionIdentifier: f.randUuid(),
    eventParam: f.randAbbreviation(),
    eventStartTime: f.randPastDate({ years: 3 }),
    eventEndTime: f.randPastDate({ years: 3 }),
    eventDuration: f.randNumber(),
    eventUrl: f.randUrl(),
    createdAt: f.randPastDate({ years: 3 }),
    updatedAt: f.randPastDate({ years: 3 }),
  };
}

/**
 * Business Unit
 */
export function generateBusinessUnit(): BusinessUnit {
  return {
    id: f.randUuid(),
    type: getBusinessUnitTypeRand(),
    name: f.randFullName(),
    description: f.randParagraph(),
    features: generateRandomLengthObjectOfArrayUnique(5, getFeatureRand),
    createdAt: f.randPastDate({ years: 3 }),
    updatedAt: f.randPastDate({ years: 3 }),
    parentBusinessUnitId: f.randUuid(),
  };
}

/**
 * Memebers
 */
export function generateMember(): Member {
  return {
    id: f.randNumber(),
    roles: generateRandomLengthObjectOfArrayUnique(2, getMemberRole),
    createdAt: f.randPastDate({ years: 3 }),
    updatedAt: f.randPastDate({ years: 3 }),
    userId: f.randUuid(),
    businessUnitId: f.randUuid(),
  };
}
