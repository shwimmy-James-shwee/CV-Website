import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BusinessUnit } from './business-unit';
import { User } from './user';
import { MemberRole } from '@/models/enums';

@ObjectType()
export class Member {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [MemberRole], { nullable: true })
  roles?: MemberRole[];

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => String, { nullable: true })
  businessUnitId?: string;

  @Field(() => BusinessUnit, { nullable: true })
  BusinessUnit?: BusinessUnit;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => User, { nullable: true })
  User?: User;
}
