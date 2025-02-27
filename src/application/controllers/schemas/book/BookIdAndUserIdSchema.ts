import { z } from 'zod';

export const BookIdAndUserIdSchema = z.object({
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid({ message: 'Enter a valid uuid' }),
  bookId: z
    .string({ message: 'Book id must be a string' })
    .uuid({ message: 'Enter a valid uuid' }),
});
