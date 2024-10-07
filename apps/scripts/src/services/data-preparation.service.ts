import { Prisma } from '@core/db';
import * as f from '@ngneat/falso';

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
    createdAt: dateCreated,
    updatedAt: dateCreated,
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
