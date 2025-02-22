import { z } from 'zod';

export const SignUpSchema = z.object({
  username: z.string().min(5, 'Username must be at least 5 characters long'),
  firstName: z.string().min(5, 'First name must be at least 5 characters long'),
  lastName: z.string().min(5, 'Last name must be at least 5 characters long'),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
