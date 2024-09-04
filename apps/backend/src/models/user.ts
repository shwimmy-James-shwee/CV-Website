import { Field, Int, ObjectType } from '@nestjs/graphql';
import { SignInLog } from '@/models/sign-in-log';
import { UserActivityLog } from '@/models/user-activity-log';
import { UserNotification } from '@/models/user-notification';
import { Member } from '@/models/member';
import { NotificationFrequency, UserRole } from '@/models/enums';

@ObjectType()
export class User {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  externalOid?: string;

  @Field(() => String, { nullable: true })
  loginEmail?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => Boolean, { nullable: true })
  isSuperAdmin?: boolean;

  @Field(() => [UserRole], { nullable: true })
  roles?: UserRole[];

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => [Int], { nullable: true })
  thumbnailPhoto?: number[];

  @Field(() => String, { nullable: true })
  timeZoneOffSet?: string;

  @Field(() => String, { nullable: true })
  timeZone?: string;

  @Field(() => NotificationFrequency, { nullable: true })
  notificationFrequency?: NotificationFrequency;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => SignInLog, { nullable: true })
  SignInLogs?: SignInLog[];

  @Field(() => UserActivityLog, { nullable: true })
  UserActivityLogs?: UserActivityLog[];

  @Field(() => UserNotification, { nullable: true })
  UserNotifications?: UserNotification[];

  @Field(() => Member, { nullable: true })
  MemberOfBusinessUnits?: Member[];
}
