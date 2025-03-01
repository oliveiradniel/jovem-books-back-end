import { z } from 'zod';

export const BookIdSchema = z
  .string({ message: 'Book id must be a string' })
  .uuid('Enter a valid book id');
