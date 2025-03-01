import { z } from 'zod';

export const UpdateCollectionSchema = z.object({
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid('Enter a valid user id'),
  name: z
    .string({ message: 'Name must be a string' })
    .min(5, 'Name must be at least 5 characters'),
  updatedAt: z.date({ message: 'Enter a valid date' }),
});
