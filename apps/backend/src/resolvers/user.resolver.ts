import { Resolver, Query, InputType, Field, Int, ObjectType, Args } from '@nestjs/graphql';
import { StringFilter } from '@/types/common/string-filter';

@InputType()
export class UserWhereInput {
  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  firstName?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  lastName?: StringFilter;
}

@InputType()
export class UserFindManyArgs {
  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;
}

@ObjectType()
export class User {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;
}

@ObjectType()
export class UserFindManyResponse {
  @Field(() => [User])
  items?: User[];
}

@Resolver()
export class UserResolver {
  @Query(() => UserFindManyResponse)
  public async findManyUsers(
    @Args(`args`, { type: () => UserFindManyArgs })
    args: UserFindManyArgs,
  ): Promise<UserFindManyResponse> {
    console.log(JSON.stringify(args));
    return {
      items: [],
    };
  }
}
