import { z } from 'zod';

export const UpdateUserSchema = z.object({
  username: z
    .string({ message: 'Username must be a string' })
    .min(5, 'Username must be at least 5 characters')
    .optional(),
  password: z
    .string({ message: 'Password must be a string' })
    .min(8, 'Password must be at least 8 characters')
    .optional(),
  firstName: z
    .string({ message: 'First name must be a string' })
    .min(5, 'First name must be at least 5 characters')
    .optional(),
  lastName: z
    .string({ message: 'Last name must be a string' })
    .min(5, 'Last name must be at least 5 characters')
    .optional(),
  email: z
    .string({ message: 'Email must be a string' })
    .email('Enter a valid email')
    .optional(),
});
