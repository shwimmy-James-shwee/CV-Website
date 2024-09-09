import { Resolver, Query, Args, Info, Mutation } from '@nestjs/graphql';
import { UserFindManyResponse } from '@/types/user/user-find-many.response';
import { UserFindManyArgs } from '@/types/user/user-find-many.args';
import { GraphQLResolveInfo } from 'graphql';
import * as GraphQlService from '@/services/graphql.service';
import * as service from '@/services/user.service';
import { logger, BaseLoggerArgs, ProjectFileName } from '@/utilities/logger/logger';
import { UserFindOneArgs } from '@/types/user/user-find-one.args';
import { User } from '@/models/user';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';
import { UserUpdateArgs } from '@/types/user/user-update.args';

const file: ProjectFileName = 'user.resolver.ts';

@Resolver()
export class UserResolver {
  @Query(() => UserFindManyResponse)
  public async findManyUsers(
    @Args('args', { type: () => UserFindManyArgs })
    args: UserFindManyArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UserFindManyResponse> {
    const requestId = 'TO_BE_ADDED';

    const baseLoggerArgs: BaseLoggerArgs = {
      requestId,
      file,
      scope: this.findManyUsers.name,
    };

    const fields = GraphQlService.getFieldsRequestedForFindMany({
      info,
      responseType: UserFindManyResponse.name,
      rootFieldEntityName: 'User',
    });

    const result = await service.findMany({ requestId, args, fields });
    if (result.isErr()) {
      const { message } = result.error;
      logger.error({ ...baseLoggerArgs, message });
      throw result.error;
    }

    logger.verbose({ ...baseLoggerArgs, message: 'Resolver execution successful' });
    return result.value;
  }

  @Query(() => User)
  public async findOneUser(
    @Args('args', { type: () => UserFindOneArgs })
    args: UserFindOneArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<User> {
    const requestId = 'TO_BE_ADDED';

    const baseLoggerArgs: BaseLoggerArgs = {
      requestId,
      file,
      scope: this.findOneUser.name,
    };

    const fields = GraphQlService.extractFields({
      resolveTree: parseResolveInfo(info) as ResolveTree,
      entityName: 'User',
    });

    const result = await service.findOne({ requestId, args, fields });

    if (result.isErr()) {
      const { message } = result.error;
      logger.error({ ...baseLoggerArgs, message });
      throw result.error;
    }

    logger.verbose({ ...baseLoggerArgs, message: 'Resolver execution successful' });
    return result.value;
  }

  @Mutation(() => User)
  public async updateUser(
    @Args('args', { type: () => UserUpdateArgs })
    args: UserUpdateArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<User> {
    const requestId = 'TO_BE_ADDED';

    const baseLoggerArgs: BaseLoggerArgs = {
      requestId,
      file,
      scope: this.updateUser.name,
    };

    const fields = GraphQlService.extractFields({
      resolveTree: parseResolveInfo(info) as ResolveTree,
      entityName: 'User',
    });

    const result = await service.update({ requestId, args, fields });

    if (result.isErr()) {
      const { message } = result.error;
      logger.error({ ...baseLoggerArgs, message });
      throw result.error;
    }

    logger.verbose({ ...baseLoggerArgs, message: 'Resolver execution successful' });
    return result.value;
  }
}
