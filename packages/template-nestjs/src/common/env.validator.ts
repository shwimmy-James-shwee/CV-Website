import { z } from 'zod';
import * as dotenv from 'dotenv';
dotenv.config();

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  PORT: z.number().default(9000),
  DB_URL: z
    .string()
    .nonempty('Please enter a database URL into your .env file'),
});

export type Env = z.infer<typeof EnvSchema>;

const validator = () => {
  const parsed = EnvSchema.safeParse(process.env);
  if (parsed.success === false) {
    throw parsed.error;
  } else {
    return parsed.data;
  }
};

export const env: Env = validator();
