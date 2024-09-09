import { err, fromPromise, ok, ResultAsync } from 'neverthrow';
import { fromError } from 'zod-validation-error';
import { User } from '@/models/user';
import { getDefaultNumberOfItemsToRetrieve, prismaReadService } from '@/services/prisma.service';
import { FindManyDto, FindOneDto, UpdateDto } from '@/types/common/io';
import { UserFindManyArgs } from '@/types/user/user-find-many.args';
import { UserFindManyResponse } from '@/types/user/user-find-many.response';
import { logger, BaseLoggerArgs, ProjectFileName } from '@/utilities/logger/logger';
import { UserFindOneArgs } from '@/types/user/user-find-one.args';
import { StringWhereUniqueInputSchema } from '@/types/common/where-unique.input';
import { isNull, objectIsEmpty } from '@core/utils';
import { UserUpdateArgs } from '@/types/user/user-update.args';
import * as CrudService from '@/services/crud.service';

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

  // validate columns to reterieve
  const validateColumns = CrudService.validateFieldsRequested({ requestId, args: fields });
  if (validateColumns.isErr()) {
    const { message } = validateColumns.error;
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }

  // db call
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

export const findOne = async (dto: FindOneDto<UserFindOneArgs>): Promise<ResultAsync<User, Error>> => {
  const { requestId, fields, args } = dto;
  const baseLoggerArgs: BaseLoggerArgs = {
    requestId,
    file,
    scope: findOne.name,
  };

  // validate ID
  const validateId = StringWhereUniqueInputSchema.safeParse(args?.where);
  if (validateId.success === false) {
    const { message } = fromError(validateId.error);
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }

  // validate columns to reterieve
  const validateColumns = CrudService.validateFieldsRequested({ requestId, args: fields });
  if (validateColumns.isErr()) {
    const { message } = validateColumns.error;
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }

  // db call
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

export const update = async (dto: UpdateDto<UserUpdateArgs>): Promise<ResultAsync<User, Error>> => {
  const { requestId, fields, args } = dto;
  const baseLoggerArgs: BaseLoggerArgs = {
    requestId,
    file,
    scope: update.name,
  };

  // validate ID
  const validateId = StringWhereUniqueInputSchema.safeParse(args?.where);
  if (validateId.success === false) {
    const { message } = fromError(validateId.error);
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }

  // validate payload
  if (objectIsEmpty(args?.data)) {
    const message = 'Please specify the properties you would like to update, we received an empty object';
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }

  // validate columns to reterieve
  const validateColumns = CrudService.validateFieldsRequested({ requestId, args: fields });
  if (validateColumns.isErr()) {
    const { message } = validateColumns.error;
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }

  // db call
  const result = await fromPromise(
    prismaReadService.user.update({
      where: args?.where,
      data: args?.data,
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
    const message = `Failed to update data from db. Prisma Error: ${JSON.stringify(result.error)}`;
    logger.error({ ...baseLoggerArgs, message });
    return err(new Error(message));
  }

  const message = 'Updated item in db';
  logger.verbose({ ...baseLoggerArgs, message });

  return ok<User>(result.value as unknown as User);
};
