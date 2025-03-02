import { z } from 'zod';

export const ListCollectionsByBookIdSchema = z.object({
  bookId: z
    .string({ message: 'Book id must be a string' })
    .uuid('Enter a valid book id'),
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid('Enter a valid user id'),
});
