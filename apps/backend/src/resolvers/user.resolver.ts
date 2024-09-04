import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserFindManyResponse } from '@/types/user/user-find-many.response';
import { UserFindManyArgs } from '@/types/user/user-find-many.args';

@Resolver()
export class UserResolver {
  @Query(() => UserFindManyResponse)
  public async findManyUsers(
    @Args('args', { type: () => UserFindManyArgs })
    args: UserFindManyArgs,
  ): Promise<UserFindManyResponse> {
    return {
      items: [
        {
          id: args?.take?.toString(),
        },
      ],
    };
  }
}
