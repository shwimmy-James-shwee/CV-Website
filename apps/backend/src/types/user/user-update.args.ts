import { Field, InputType, Int } from '@nestjs/graphql';
import { StringWhereUniqueInput } from '../common/where-unique.input';
import { NotificationFrequency, UserRole } from '@/models/enums';
import { NotificationFrequency as _NotificationFrequency, UserRole as _UserRole } from '@core/db';

@InputType()
export class UserUpdateInput {
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
  roles?: _UserRole[]; // use enum from prisma

  @Field(() => String, { nullable: true })
  avatarUrl?: string;

  @Field(() => [Int], { nullable: true })
  thumbnailPhoto?: number[];

  @Field(() => String, { nullable: true })
  timeZoneOffSet?: string;

  @Field(() => String, { nullable: true })
  timeZone?: string;

  @Field(() => NotificationFrequency, { nullable: true })
  notificationFrequency?: _NotificationFrequency; // use enum from prisma
}

@InputType()
export class UserUpdateArgs {
  @Field(() => StringWhereUniqueInput, { nullable: false })
  where: StringWhereUniqueInput;

  @Field(() => UserUpdateInput, { nullable: false })
  data: UserUpdateInput;
}
