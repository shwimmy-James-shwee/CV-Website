import { User } from '@/models/user';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserFindManyResponse {
  @Field(() => [User])
  items?: User[];
}
