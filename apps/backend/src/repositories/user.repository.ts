import { err, fromPromise, ok, ResultAsync } from 'neverthrow';
import { User } from '@/models/user';
import { getDefaultNumberOfItemsToRetrieve, prismaReadService } from '@/services/prisma.service';
import { FindManyDto } from '@/types/common/io';
import { UserFindManyArgs } from '@/types/user/user-find-many.args';
import { UserFindManyResponse } from '@/types/user/user-find-many.response';
import { logger } from '@/utilities/logger/logger';

export const findMany = async (
  dto: FindManyDto<UserFindManyArgs>,
): Promise<ResultAsync<UserFindManyResponse, Error>> => {
  const { fields, args } = dto;

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
    const message = `Failed to retrieve data from db`;
    logger.error(message);
    return err(new Error(message));
  }

  const message = `Found ${result.value?.length} items in db`;
  logger.verbose(message);

  const response: UserFindManyResponse = {
    items: result.value as unknown as User[],
  };

  return ok<UserFindManyResponse>(response);
};
