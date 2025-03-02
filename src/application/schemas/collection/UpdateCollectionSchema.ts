import { z } from 'zod';

export const IdsSchema = z.object({
  collectionId: z
    .string({ message: 'Collection id must be a string' })
    .uuid('Enter a valid collection id'),
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid('Enter a valid collection id'),
});

export const UpdateDataCollectionSchema = z.object({
  name: z
    .string({ message: 'Name must be a string' })
    .min(5, 'Name must be at least 5 characters'),
  updatedAt: z.date({ message: 'Enter a valid date' }),
});
