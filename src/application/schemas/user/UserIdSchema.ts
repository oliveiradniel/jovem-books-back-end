import { z } from 'zod';

export const UserIdSchema = z
  .string({ message: 'Id must be a string' })
  .uuid('Enter a valid user id');
