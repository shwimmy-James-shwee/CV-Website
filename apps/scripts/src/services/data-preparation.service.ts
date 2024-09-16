import { logger } from '@/common/logger';
import {
  BusinessUnitType,
  Feature,
  Member,
  MemberRole,
  NotificationFrequency,
  NotificationStatus,
  Prisma,
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
 * Generate random `Prisma.UserNotificationCreateManyInput`
 */
export const generateUserNotificationCreateManyInput = (userId: string): Prisma.UserNotificationCreateManyInput => {
  const dateCreated = f.randPastDate({ years: 3 });
  const item: Prisma.UserNotificationCreateManyInput = {
    status: generateRandomLengthObjectOfArrayUnique(10, getRandNotificationStatus),
    message: f.randPhrase(),
    createdAt: dateCreated,
    updatedAt: dateCreated,
    userId,
    additionalAttribute: f.randJSON(),
  };
  return item;
};

/**
 * Generate random `Prisma.SignInLogCreateInput`
 */
export const generateSignInLogCreateManyInput = (userId: string): Prisma.SignInLogCreateManyInput => {
  const signInDateTime = f.randPastDate({ years: 3 });
  return {
    userId,
    signInDateTime,
    createdAt: signInDateTime,
    updatedAt: signInDateTime,
  };
};

/**
 * Generates random `UserActivityLogCreateManyInput`
 */
export const generateUserActivityLogCreateManyInput = (userId: string): Prisma.UserActivityLogCreateManyInput => {
  const eventStartTime = f.randPastDate({ years: 2 });
  const eventEndTime = new Date(eventStartTime.getTime() + f.randNumber());
  const eventDuration = Math.abs(eventEndTime.getTime() - eventStartTime.getTime());

  const createdAt = f.randPastDate({ years: 3 });

  return {
    userId,
    sessionIdentifier: f.randUuid(),
    eventStartTime,
    eventEndTime,
    eventDuration,
    eventUrl: f.randUrl(),
    createdAt,
    updatedAt: createdAt,
  };
};

/**
 * Generates random `BusinessUnitCreateManyInput`
 *
 *
 */
export const generateBusinessUnitCreateManyInput = (args: {
  parentBusinessUnitId: string | undefined;
}): Prisma.BusinessUnitCreateManyInput => {
  const createdAt = f.randPastDate({ years: 3 });

  const { parentBusinessUnitId } = args;

  return {
    id: f.randUuid(),
    type: getRandBusinessUnitType(),
    name: f.randFullName(),
    description: f.randParagraph(),
    features: generateRandomLengthObjectOfArrayUnique(2, getRandFeature),
    createdAt,
    updatedAt: createdAt,
    parentBusinessUnitId,
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
  count: z.number().int().min(0),
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
  const inputs = Array.from({ length: count }, () => generateSignInLogCreateManyInput(userId));

  return ok<Prisma.SignInLogCreateManyInput[]>(inputs);
};

/**
 * Generates all payloads for creating SignInLogs for all users
 */
export const generateSignInLogsForAllUsers = (userIds: string[]): Prisma.SignInLogCreateManyInput[] => {
  const result = userIds
    ?.map((userId) => {
      const createManyInputs = generateSignInLogsOfUser({ userId, count: f.randNumber({ min: 10, max: 20 }) });
      if (createManyInputs.isErr()) {
        return null;
      }
      return createManyInputs.value;
    })
    ?.flatMap((item) => item)
    ?.filter((item) => item !== null);
  return result;
};

/**
 * Generates an aray with x number of Prisma.UserActivityLogCreateManyInput[] for a particular user
 */
export const generateUserActivityLogCreateManyInputsOfUser = (
  args: SeedEntityOfUserArgs,
): Result<Prisma.UserActivityLogCreateManyInput[], Error> => {
  // validate input
  const validateInput = SeedEntityOfUserArgsSchema.safeParse(args);
  if (validateInput.success === false) {
    const { message } = fromError(validateInput.error);
    logger.error(message);
    return err(new Error(message));
  }

  const { userId, count } = args;

  // generating payloads for 1 user
  const inputs = Array.from({ length: count }, () => generateUserActivityLogCreateManyInput(userId));

  return ok<Prisma.UserActivityLogCreateManyInput[]>(inputs);
};

/**
 * Generates all payloads for creating UserActivityLogs for all users
 */
export const generateUserActivityLogCreateManyInputForAllUsers = (
  userIds: string[],
): Prisma.UserActivityLogCreateManyInput[] => {
  const result = userIds
    ?.map((userId) => {
      const createManyInputs = generateUserActivityLogCreateManyInputsOfUser({
        userId,
        count: f.randNumber({ min: 10, max: 20 }),
      });
      if (createManyInputs.isErr()) {
        return null;
      }
      return createManyInputs.value;
    })
    ?.flatMap((item) => item)
    ?.filter((item) => item !== null);
  return result;
};

/**
 * Generates all payloads for creating UserNotification for all users
 */
export const generateUserNotificationCreateManyInputForAllUsers = (
  userIds: string[],
): Prisma.UserNotificationCreateManyInput[] => {
  logger.debug(`generateUserNotificationCreateManyInputForAllUsers - userIds.length => ${userIds?.length}`);

  let inputs: Prisma.UserNotificationCreateManyInput[] = [];

  userIds?.forEach((userId, _i) => {
    const isDividable = _i % 50 === 0;

    logger.debug(
      `generateUserNotificationCreateManyInputForAllUsers - iteration ${_i + 1} | isDividableByHundred: ${isDividable}`,
    );

    if (isDividable) {
      const notificationCount = f.randNumber({ min: 0, max: 10 });

      if (notificationCount > 0) {
        logger.debug(
          `generateUserNotificationCreateManyInputForAllUsers - adding ${notificationCount} UserNotification for user "${userId}"`,
        );
        const userNotificationInputs: Prisma.UserNotificationCreateManyInput[] = Array.from(
          { length: notificationCount },
          (): Prisma.UserNotificationCreateManyInput => {
            return generateUserNotificationCreateManyInput(userId);
          },
        );
        inputs = [...inputs, ...userNotificationInputs];
      }
    }
  });

  return inputs;
};

export const mockBusinssUnitCreateManyInput = (): Prisma.BusinessUnitCreateManyInput[] => {
  const tierOne = [generateBusinessUnitCreateManyInput({ parentBusinessUnitId: undefined })];
  const tierTwo = Array.from({ length: 3 }, () =>
    generateBusinessUnitCreateManyInput({ parentBusinessUnitId: tierOne[0]?.id }),
  );

  const tierThree = Array.from({ length: 6 }, () =>
    generateBusinessUnitCreateManyInput({
      parentBusinessUnitId: tierTwo[f.randNumber({ min: 0, max: tierTwo?.length - 1 })]?.id,
    }),
  );

  const tierFour = Array.from({ length: 9 }, () =>
    generateBusinessUnitCreateManyInput({
      parentBusinessUnitId: tierTwo[f.randNumber({ min: 0, max: tierThree?.length - 1 })]?.id,
    }),
  );

  return [...tierOne, ...tierTwo, ...tierThree, ...tierFour];
};
