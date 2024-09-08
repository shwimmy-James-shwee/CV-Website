import { Field, InputType } from '@nestjs/graphql';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserFindOneArgs {
  @Field(() => UserWhereUniqueInput, { nullable: false })
  where: UserWhereUniqueInput;
}
