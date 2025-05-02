import { z } from 'zod';

import { UsernameSchema } from './UsernameSchema';
import { EmailSchema } from './EmailSchema';

export const BaseUserSchema = z.object({
  username: UsernameSchema,
  firstName: z
    .string({ message: 'First name must be a string' })
    .min(3, 'First name must be at least 3 characters long'),
  lastName: z
    .string({ message: 'Last name must be a string' })
    .min(3, 'Last name must be at least 3 characters long'),
  email: EmailSchema,
  password: z
    .string({ message: 'Password must be a string' })
    .min(8, 'Password must be at least 8 characters long'),
});
