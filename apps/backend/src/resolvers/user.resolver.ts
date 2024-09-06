import { Resolver, Query, Args, Info } from '@nestjs/graphql';
import { UserFindManyResponse } from '@/types/user/user-find-many.response';
import { UserFindManyArgs } from '@/types/user/user-find-many.args';
import { GraphQLResolveInfo } from 'graphql';
import * as GraphQlService from '@/services/graphql.service';
import * as service from '@/services/user.service';
import { logger } from '@/utilities/logger/logger';

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
      logger.error(result.error.message)
      throw result.error;
    }

    logger.verbose(`${UserResolver.name}.${this.findManyUsers.name}() did not throw errors`)
    return result.value;
  }
}
