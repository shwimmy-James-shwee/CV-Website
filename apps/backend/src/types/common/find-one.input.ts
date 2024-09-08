import { Field, InputType, Int } from '@nestjs/graphql';
import { z } from 'zod';

@InputType()
export class FindOneInputWhereIdIsString {
  @Field(() => String, { nullable: false })
  id: string;
}

@InputType()
export class FindOneInputWhereIdIsInteger {
  @Field(() => Int, { nullable: false })
  id: number;
}

export const FindOneInputWhereIdIsStringSchema = z.object({
  id: z
    .string()
    .min(1)
    .refine((s) => !s.includes(' '), 'No space characters allowed for ID'),
});

export const FindOneInputWhereIdIsIntegerSchema = z.object({
  id: z.number().positive().int(),
});
