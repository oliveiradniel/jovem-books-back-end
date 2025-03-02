import { z } from 'zod';

export const DeleteBookCollectionSchema = z.object({
  bookCollectionId: z.object({
    bookId: z
      .string({ message: 'Book id must be a string' })
      .uuid('Enter a valid book id'),
    collectionId: z
      .string({ message: 'Collection id must be a string' })
      .uuid('Enter a valid collection id'),
  }),
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid('Enter a valid user id'),
});
