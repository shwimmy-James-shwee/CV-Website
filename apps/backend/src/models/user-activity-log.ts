import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user';

@ObjectType()
export class UserActivityLog {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  sessionIdentifier?: string;

  @Field(() => Date, { nullable: true })
  eventStartTime?: Date;

  @Field(() => Date, { nullable: true })
  eventEndTime?: Date;

  @Field(() => Int, { nullable: true })
  eventDuration?: number;

  @Field(() => String, { nullable: true })
  eventParam?: string;

  @Field(() => String, { nullable: true })
  eventUrl?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => User, { nullable: true })
  User?: User;
}
