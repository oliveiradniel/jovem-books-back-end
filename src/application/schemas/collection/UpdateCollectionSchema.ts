import { z } from 'zod';

export const UpdateCollectionSchema = z.object({
  id: z
    .string({ message: 'Collection id must be a string' })
    .uuid({ message: 'Enter a valid uuid' }),
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid({ message: 'Enter a valid uuid' }),
  name: z
    .string({ message: 'Name must be a string' })
    .min(5, { message: 'Name must be at least 5 characters' }),
  updatedAt: z.date({ message: 'Enter a valid date' }),
});
