import { logger } from '@/common/logger';
import {
  BusinessUnit,
  BusinessUnitType,
  Feature,
  Member,
  MemberRole,
  NotificationFrequency,
  NotificationStatus,
  Prisma,
  UserActivityLog,
  UserRole,
} from '@core/db';
import * as f from '@ngneat/falso';
import { err, ok, Result } from 'neverthrow';
import { z } from 'zod';
import { fromError } from 'zod-validation-error';

// ===== Helper functions to generate random indexes =====

/**
 * Generate a random number between 2 ranges (min and max included)
 */
export const generateRandomIndex = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const generateBiasedRandomBinaryIndex = (biasThreshold: number): number => {
  if (Math.random() < biasThreshold) {
    return 1;
  }
  return 0;
};

export const generateBiasedRandomBool = (biasThreshold: number): boolean => {
  if (Math.random() < biasThreshold) {
    return true;
  }
  return false;
};

// Generates a random array of object (type T) with no duplicates
export const generateRandomLengthObjectOfArrayUnique = <T>(length: number, callback: () => T): T[] => {
  const objs = new Set<T>();
  for (let i = 0; i < length; i++) {
    objs.add(callback());
  }
  return Array.from(objs);
};

// ===== Functions to generate Enums variants randomly =====

/**
 * Should randomly generate STANDARD_USER 95% of the time and rest ADMINISTRATOR
 */
export const getUserRole = (): UserRole => {
  const randomIdx = generateBiasedRandomBinaryIndex(0.05);
  const randomEnum = Object.keys(UserRole)[randomIdx];
  return randomEnum as UserRole;
};

/**
 * Should randomly generate STANDARD 95% of the time and rest ADMINISTRATOR
 */
export const getMemberRole = (): MemberRole => {
  const randomIdx = generateBiasedRandomBinaryIndex(0.05);
  const randomEnum = Object.keys(MemberRole)[randomIdx];
  return randomEnum as MemberRole;
};

/**
 * Generate random NotificationFrequency
 */
export const getRandNotificationFrequence = (): NotificationFrequency => {
  const enumLength = Object.keys(NotificationFrequency).length - 1;
  const randomIdx = generateRandomIndex(0, enumLength);
  const randomEnum = Object.keys(NotificationFrequency)[randomIdx];
  return randomEnum as NotificationFrequency;
};

export const getRandNotificationStatus = (): NotificationStatus => {
  const enumLength = Object.keys(NotificationStatus).length - 1;
  const randomIdx = generateRandomIndex(0, enumLength);
  const randomEnum = Object.keys(NotificationStatus)[randomIdx];
  return randomEnum as NotificationStatus;
};

export const getRandFeature = (): Feature => {
  const enumLength = Object.keys(Feature).length - 1;
  const randomIdx = generateRandomIndex(0, enumLength);
  const randomEnum = Object.keys(Feature)[randomIdx];
  return randomEnum as Feature;
};

export const getRandBusinessUnitType = (): BusinessUnitType => {
  const enumLength = Object.keys(BusinessUnitType).length - 1;
  const randomIdx = generateRandomIndex(0, enumLength);
  const randomEnum = Object.keys(BusinessUnitType)[randomIdx];
  return randomEnum as BusinessUnitType;
};

/**
 * Generate random `Prisma.UserCreateInput`
 */
export const generateUserCreateInput = (): Prisma.UserCreateInput => {
  const firstName = f.randFirstName({ withAccents: false });
  const lastName = f.randLastName({ withAccents: false });
  const loginEmail = f.randEmail({ firstName, lastName, nameSeparator: '-' });
  const dateCreated = f.randPastDate({ years: 3 });

  const item: Prisma.UserCreateInput = {
    loginEmail,
    firstName,
    lastName,
    isSuperAdmin: generateBiasedRandomBool(0.01),
    roles: [getUserRole()],
    thumbnailPhoto: [f.randNumber()],
    timeZoneOffSet: `${f.randNumber()}`,
    timeZone: f.randTimeZone(),
    notificationFrequency: getRandNotificationFrequence(),
    createdAt: dateCreated,
    updatedAt: dateCreated,
  };

  return item;
};

/**
 * Generate random `Prisma.UserNotificationCreateInput`
 */
export const generateUserNotificationCreateInput = (userId: string): Prisma.UserNotificationCreateInput => {
  const dateCreated = f.randPastDate({ years: 3 });
  const item: Prisma.UserNotificationCreateInput = {
    status: generateRandomLengthObjectOfArrayUnique(10, getRandNotificationStatus),
    message: f.randPhrase(),
    createdAt: dateCreated,
    updatedAt: dateCreated,
    User: {
      connect: { id: userId },
    },
    additionalAttribute: f.randJSON(),
  };
  return item;
};

/**
 * Generate random `Prisma.SignInLogCreateInput`
 */
export const generateSignInLogCreateInput = (userId: string): Prisma.SignInLogCreateManyInput => {
  const signInDateTime = f.randPastDate({ years: 3 });
  return {
    userId,
    signInDateTime,
    createdAt: signInDateTime,
    updatedAt: signInDateTime,
  };
};

/**
 * User Activity Log
 */
export const generateUserActivityLog = (userId: string): UserActivityLog => {
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
};

/**
 * Business Unit
 */
export const generateBusinessUnit = (): BusinessUnit => {
  return {
    id: f.randUuid(),
    type: getRandBusinessUnitType(),
    name: f.randFullName(),
    description: f.randParagraph(),
    features: generateRandomLengthObjectOfArrayUnique(5, getRandFeature),
    createdAt: f.randPastDate({ years: 3 }),
    updatedAt: f.randPastDate({ years: 3 }),
    parentBusinessUnitId: f.randUuid(),
  };
};

/**
 * Memebers
 */
export const generateMember = (): Member => {
  return {
    id: f.randNumber(),
    roles: generateRandomLengthObjectOfArrayUnique(2, getMemberRole),
    createdAt: f.randPastDate({ years: 3 }),
    updatedAt: f.randPastDate({ years: 3 }),
    userId: f.randUuid(),
    businessUnitId: f.randUuid(),
  };
};

const SeedEntityOfUserArgsSchema = z.object({
  userId: z.string().min(1),
  count: z.number().int().positive(),
});
export type SeedEntityOfUserArgs = z.infer<typeof SeedEntityOfUserArgsSchema>;

/**
 * Generates an aray with x number of Prisma.SignInLogCreateInput[] for a particular user
 */
export const generateSignInLogsOfUser = (
  args: SeedEntityOfUserArgs,
): Result<Prisma.SignInLogCreateManyInput[], Error> => {
  // validate input
  const validateInput = SeedEntityOfUserArgsSchema.safeParse(args);
  if (validateInput.success === false) {
    const { message } = fromError(validateInput.error);
    logger.error(message);
    return err(new Error(message));
  }

  const { userId, count } = args;

  // generating payloads for 1 user
  const inputs = Array.from({ length: count }, () => generateSignInLogCreateInput(userId));

  return ok<Prisma.SignInLogCreateManyInput[]>(inputs);
};

/**
 * Generates all payloads for creating SignInLogs for all users
 */
export const generateSignInLogsForAllUsers = (userIds: string[]) => {
  const result = userIds
    ?.map((userId) => {
      const signInLogsCreateInputs = generateSignInLogsOfUser({ userId, count: f.randNumber({ min: 10, max: 20 }) });
      if (signInLogsCreateInputs.isErr()) {
        return null;
      }
      return signInLogsCreateInputs.value;
    })
    ?.flatMap((item) => item)
    ?.filter((item) => item !== null);
  return result;
};
