import { Field, InputType } from '@nestjs/graphql';
import { StringWhereUniqueInput } from '../common/where-unique.input';

@InputType()
export class UserFindOneArgs {
  @Field(() => StringWhereUniqueInput, { nullable: false })
  where: StringWhereUniqueInput;
}
