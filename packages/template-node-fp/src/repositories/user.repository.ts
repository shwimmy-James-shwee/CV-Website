import { CreateUserReqBody } from '../controllers/user.controller';
import * as Helpers from '../utils/helpers';
import * as crypto from 'crypto';
import { err, ok, ResultAsync } from 'neverthrow';

export type CreateUserResBody = CreateUserReqBody & {
  id: string;
  password: string;
  createdAt: Date;
};

/**
 * Mocking actual DB insertion
 */
export const createUser = async (
  args: CreateUserReqBody,
): Promise<ResultAsync<CreateUserResBody, unknown>> => {

  // Mock DB ORM
  const db = {
    // Mock user entity
    user: {
      // Mock creating user
      create: async (args: CreateUserReqBody): Promise<CreateUserResBody> => {
        setTimeout(() => {
          console.log(`Waited 0.8s`);
        }, 800);
        return {
          ...args,
          id: crypto.randomUUID(),
          password: Helpers.hashPassword(args.email),
          createdAt: new Date(),
        };
      },
    },
  };

  // handle result & map errors
  const putResult = await ResultAsync.fromPromise(
    db.user.create(args),
    (error: any) => {
      return error;
    },
  );
  if (putResult.isErr()) {
    return err(putResult.error);
  }
  return ok(putResult.value);
};
