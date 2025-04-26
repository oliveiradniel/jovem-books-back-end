import { z } from 'zod';

export const IdUserSchema = z.object({
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid('Enter a valid user id'),
});
