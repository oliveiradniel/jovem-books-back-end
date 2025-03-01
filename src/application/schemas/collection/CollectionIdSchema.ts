import { z } from 'zod';

export const CollectionIdSchema = z
  .string({ message: 'Collection id must be a string' })
  .uuid('Enter a valid collection id');
