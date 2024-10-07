import { Field, InputType } from '@nestjs/graphql';
import { StringWhereUniqueInput } from '../common/where-unique.input';

@InputType()
export class UserUpdateInput {
  @Field(() => String, { nullable: true })
  loginEmail?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => Boolean, { nullable: true })
  isSuperAdmin?: boolean;
}

@InputType()
export class UserUpdateArgs {
  @Field(() => StringWhereUniqueInput, { nullable: false })
  where: StringWhereUniqueInput;

  @Field(() => UserUpdateInput, { nullable: false })
  data: UserUpdateInput;
}
