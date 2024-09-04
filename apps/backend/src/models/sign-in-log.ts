import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
export class SignInLog {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => Date, { nullable: true })
  signInDate?: Date;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => User, { nullable: true })
  User?: User;
}
