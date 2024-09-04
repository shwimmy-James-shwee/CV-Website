import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from './user';
import { NotificationStatus } from '@/models/enums';

@ObjectType()
export class UserNotification {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [NotificationStatus], { nullable: true })
  status?: NotificationStatus[];

  @Field(() => String, { nullable: true })
  message?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => User, { nullable: true })
  User?: User;
}
