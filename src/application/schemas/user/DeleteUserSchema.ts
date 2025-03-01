import { z } from 'zod';

export const DeleteUserSchema = z
  .string({ message: 'User id must be a string' })
  .uuid('Enter a valid user id');
