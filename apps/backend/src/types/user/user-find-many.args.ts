import { Field, InputType, Int } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { StringWhereUniqueInput } from '../common/where-unique.input';

@InputType()
export class UserFindManyArgs {
  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => UserWhereInput, { nullable: true })
  where?: UserWhereInput;

  @Field(() => StringWhereUniqueInput, { nullable: true })
  cursor?: StringWhereUniqueInput;
}
