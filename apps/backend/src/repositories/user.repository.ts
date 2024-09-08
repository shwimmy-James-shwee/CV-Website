import { err, fromPromise, ok, ResultAsync } from 'neverthrow';
import { fromError } from 'zod-validation-error';
import { User } from '@/models/user';
import { getDefaultNumberOfItemsToRetrieve, prismaReadService } from '@/services/prisma.service';
import { FindManyDto } from '@/types/common/io';
import { UserFindManyArgs } from '@/types/user/user-find-many.args';
import { UserFindManyResponse } from '@/types/user/user-find-many.response';
import { logger, BaseLoggerArgs, ProjectFileName } from '@/utilities/logger/logger';
import { UserFindOneArgs } from '@/types/user/user-find-one.args';
import { FindOneInputWhereIdIsStringSchema } from '@/types/common/find-one.input';
import { isNull } from '@core/utils';

const file: ProjectFileName = 'user.repository.ts';

export const findMany = async (
  dto: FindManyDto<UserFindManyArgs>,
): Promise<ResultAsync<UserFindManyResponse, Error>> => {
  const { requestId, fields, args } = dto;
  const baseLoggerArgs: BaseLoggerArgs = {
    requestId,
    file,
    scope: findMany.name,
  };

  const result = await fromPromise(
    prismaReadService.user.findMany({
      where: args?.where,
      take: getDefaultNumberOfItemsToRetrieve(args?.take),
      skip: args?.skip,
      select: {
        id: fields?.mainFields?.includes('id' as keyof User),
        externalOid: fields?.mainFields?.includes('externalOid' as keyof User),
        loginEmail: fields?.mainFields?.includes('loginEmail' as keyof User),
        firstName: fields?.mainFields?.includes('firstName' as keyof User),
        lastName: fields?.mainFields?.includes('lastName' as keyof User),
        isSuperAdmin: fields?.mainFields?.includes('isSuperAdmin' as keyof User),
        // roles
        avatarUrl: fields?.mainFields?.includes('avatarUrl' as keyof User),
        // thumbnailPhoto
        timeZoneOffSet: fields?.mainFields?.includes('timeZoneOffSet' as keyof User),
        timeZone: fields?.mainFields?.includes('timeZone' as keyof User),
        notificationFrequency: fields?.mainFields?.includes('notificationFrequency' as keyof User),
        createdAt: fields?.mainFields?.includes('createdAt' as keyof User),
        updatedAt: fields?.mainFields?.includes('updatedAt' as keyof User),
        // SignInLogs
        // UserActivityLogs
        // UserNotifications
        // MemberOfBusinessUnits
      },
    }),
    (e) => e,
  );

  if (result.isErr()) {
    const message = 'Failed to retrieve data from db';
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }

  const message = `Found ${result.value?.length} items in db`;
  logger.verbose({ ...baseLoggerArgs, message });

  const response: UserFindManyResponse = {
    items: result.value as unknown as User[],
  };

  return ok<UserFindManyResponse>(response);
};

export const findOne = async (dto: FindManyDto<UserFindOneArgs>): Promise<ResultAsync<User, Error>> => {
  const { requestId, fields, args } = dto;
  const baseLoggerArgs: BaseLoggerArgs = {
    requestId,
    file,
    scope: findOne.name,
  };

  const validateInput = FindOneInputWhereIdIsStringSchema.safeParse(args?.where);
  if (validateInput.success === false) {
    const { message } = fromError(validateInput.error);
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }

  const result = await fromPromise(
    prismaReadService.user.findUnique({
      where: args?.where,
      select: {
        id: fields?.mainFields?.includes('id' as keyof User),
        externalOid: fields?.mainFields?.includes('externalOid' as keyof User),
        loginEmail: fields?.mainFields?.includes('loginEmail' as keyof User),
        firstName: fields?.mainFields?.includes('firstName' as keyof User),
        lastName: fields?.mainFields?.includes('lastName' as keyof User),
        isSuperAdmin: fields?.mainFields?.includes('isSuperAdmin' as keyof User),
        // roles
        avatarUrl: fields?.mainFields?.includes('avatarUrl' as keyof User),
        // thumbnailPhoto
        timeZoneOffSet: fields?.mainFields?.includes('timeZoneOffSet' as keyof User),
        timeZone: fields?.mainFields?.includes('timeZone' as keyof User),
        notificationFrequency: fields?.mainFields?.includes('notificationFrequency' as keyof User),
        createdAt: fields?.mainFields?.includes('createdAt' as keyof User),
        updatedAt: fields?.mainFields?.includes('updatedAt' as keyof User),
        // SignInLogs
        // UserActivityLogs
        // UserNotifications
        // MemberOfBusinessUnits
      },
    }),
    (e) => e,
  );

  if (result.isErr()) {
    const message = 'Failed to retrieve data from db';
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }

  if (isNull(result.value)) {
    const message = 'Database query successfull, but cannot find the item you are looking for';
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }

  const message = 'Found item in db';
  logger.verbose({ ...baseLoggerArgs, message });

  return ok<User>(result.value as unknown as User);
};
