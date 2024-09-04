import { Field, ObjectType } from '@nestjs/graphql';
import { Member } from './member';
import { BusinessUnitType, Feature } from '@/models/enums';

@ObjectType()
export class BusinessUnit {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => BusinessUnitType, { nullable: true })
  type?: BusinessUnitType;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => [Feature], { nullable: true })
  features?: Feature[];

  @Field(() => String, { nullable: true })
  parentBusinessUnitId?: string;

  @Field(() => BusinessUnit, { nullable: true })
  ParentBusinessUnit?: BusinessUnit;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => Member, { nullable: true })
  Members?: Member[];

  @Field(() => [BusinessUnit], { nullable: true })
  ChildBusinessUnits?: BusinessUnit[];
}
