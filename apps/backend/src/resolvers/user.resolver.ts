import { Resolver, Query, Args, Info } from '@nestjs/graphql';
import { UserFindManyResponse } from '@/types/user/user-find-many.response';
import { UserFindManyArgs } from '@/types/user/user-find-many.args';
import { GraphQLResolveInfo } from 'graphql';
import * as GraphQlService from '@/services/graphql.service';
import * as service from '@/services/user.service';
import { logger } from '@/utilities/logger/logger';
import { UserFindOneArgs } from '@/types/user/user-find-one.args';
import { User } from '@/models/user';
import { parseResolveInfo, ResolveTree } from 'graphql-parse-resolve-info';

@Resolver()
export class UserResolver {
  @Query(() => UserFindManyResponse)
  public async findManyUsers(
    @Args('args', { type: () => UserFindManyArgs })
    args: UserFindManyArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<UserFindManyResponse> {
    const fields = GraphQlService.getFieldsRequestedForFindMany({
      info,
      responseType: UserFindManyResponse.name,
      rootFieldEntityName: 'User',
    });
    const result = await service.findMany({ requestId: 'TO_BE_ADDED', args, fields });
    if (result.isErr()) {
      logger.error(result.error.message);
      throw result.error;
    }

    logger.verbose(`${UserResolver.name}.${this.findManyUsers.name}() did not throw errors`);
    return result.value;
  }

  @Query(() => User)
  public async findOneUser(
    @Args('args', { type: () => UserFindOneArgs })
    args: UserFindOneArgs,
    @Info() info: GraphQLResolveInfo,
  ): Promise<User> {
    const fields = GraphQlService.extractFields({
      resolveTree: parseResolveInfo(info) as ResolveTree,
      entityName: `User`,
    });

    const result = await service.findOne({ requestId: 'TO_BE_ADDED', args, fields });

    if (result.isErr()) {
      logger.error(`${UserResolver.name}.${this.findOneUser.name}() - ${result.error.message}`);
      throw result.error;
    }

    logger.verbose(`${UserResolver.name}.${this.findOneUser.name}() did not throw errors`);
    return result.value;
  }
}
