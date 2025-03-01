import { z } from 'zod';

export const DeleteCollectionSchema = z.object({
  collectionId: z
    .string({ message: 'Collection id must be a string' })
    .uuid('Enter a valid uuid'),
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid('Enter a valid uuid'),
});
