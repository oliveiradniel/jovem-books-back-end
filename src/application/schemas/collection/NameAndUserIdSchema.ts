import { z } from 'zod';

export const NameAndUserIdSchema = z.object({
  name: z
    .string({ message: 'Name must be a string' })
    .min(5, 'Name must be at least 5 characters'),
  userId: z
    .string({ message: 'User Id must be a string' })
    .uuid('Enter a valid uuid'),
});
