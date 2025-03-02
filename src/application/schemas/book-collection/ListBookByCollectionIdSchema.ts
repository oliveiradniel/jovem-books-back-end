import { z } from 'zod';

export const ListBooksByCollectionIdSchema = z.object({
  collectionId: z
    .string({ message: 'Collection id must be a string' })
    .uuid('Enter a valid collection id'),
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid('Enter a valid user id'),
});
