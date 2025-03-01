import { z } from 'zod';

export const ListBooksSchema = z.object({
  userId: z
    .string({ message: 'User Id must be a string' })
    .uuid('Enter a valid user id'),
  orderBy: z
    .enum(['asc', 'desc'], { message: 'Enter a valid order by' })
    .optional(),
});
