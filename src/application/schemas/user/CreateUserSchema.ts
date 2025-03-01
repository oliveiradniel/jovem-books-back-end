import { z } from 'zod';

export const CreateUserSchema = z.object({
  username: z
    .string({ message: 'Username must be a string' })
    .min(5, 'Username must be at least 5 characters long'),
  firstName: z
    .string({ message: 'First name must be a string' })
    .min(5, 'First name must be at least 5 characters long'),
  lastName: z
    .string({ message: 'Last name must be a string' })
    .min(5, 'Last name must be at least 5 characters long'),
  email: z
    .string({ message: 'E-mail must be a string' })
    .email('Enter a valid email'),
  password: z
    .string({ message: 'Password must be a string' })
    .min(8, 'Password must be at least 8 characters long'),
});
