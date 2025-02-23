import { z } from 'zod';

export const SignInSchema = z.object({
  username: z
    .string({ message: 'Username must be a string' })
    .min(5, 'Username must be at least 5 characters long'),
  password: z
    .string({ message: 'Password must be a string' })
    .min(8, 'Password must be at least 5 characters long'),
});
