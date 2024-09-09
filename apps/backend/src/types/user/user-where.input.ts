import { Field, InputType } from '@nestjs/graphql';
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
