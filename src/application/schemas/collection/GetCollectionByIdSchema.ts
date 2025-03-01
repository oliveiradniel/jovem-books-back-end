import { z } from 'zod';

export const GetCollectionByIdSchema = z.object({
  collectionId: z
    .string({ message: 'Collection id must be a string' })
    .uuid({ message: 'Enter a valid uuid' }),
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid({ message: 'Enter a valid uuid' }),
});
