import { z } from 'zod';

export const GetUserByIdSchema = z
  .string({ message: 'User id must be a string' })
  .uuid('Enter a valid user id');
