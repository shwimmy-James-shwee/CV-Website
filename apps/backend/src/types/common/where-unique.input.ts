import { Field, InputType, Int } from '@nestjs/graphql';
import { z } from 'zod';

@InputType({ description: 'Useful for specifying a record of a table where the IDs are stored as strings' })
export class StringWhereUniqueInput {
  @Field(() => String, { nullable: false })
  id: string;
}

@InputType({ description: 'Useful for specifying a record of a table where the IDs are stored as integers' })
export class IntegerWhereUniqueInput {
  @Field(() => Int, { nullable: false })
  id: number;
}

/** Schema for StringWhereUniqueInput */
export const StringWhereUniqueInputSchema = z.object({
  id: z
    .string()
    .min(1)
    .refine((s) => !s.includes(' '), 'No space characters allowed for ID'),
});

/** Schema for IntegerWhereUniqueInput */
export const IntegerWhereUniqueInputSchema = z.object({
  id: z.number().positive().int(),
});
