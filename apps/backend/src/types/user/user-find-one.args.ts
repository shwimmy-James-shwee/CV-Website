import { Field, InputType } from '@nestjs/graphql';
import { FindOneInputWhereIdIsString } from '../common/find-one.input';

@InputType()
export class UserFindOneArgs {
  @Field(() => FindOneInputWhereIdIsString, { nullable: false })
  where: FindOneInputWhereIdIsString;
}
