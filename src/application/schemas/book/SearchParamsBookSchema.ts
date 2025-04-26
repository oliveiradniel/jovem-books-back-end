import { z } from 'zod';

import { IdUserSchema } from '../UserSchemas';

export const SearchParamsBookSchema = z.object({
  userId: IdUserSchema,
  title: z
    .string({ message: 'Title must be a string' })
    .min(3, 'Title must be at least 3 characters'),
  author: z
    .string({ message: 'Author must be a string' })
    .min(3, 'Author must be at least 3 characters'),
});
