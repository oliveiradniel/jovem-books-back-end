import { z } from 'zod';

import { IdUserSchema } from '../UserSchemas';

export const ListBooksSchema = z
  .object({
    orderBy: z
      .enum(['asc', 'desc'], { message: 'Enter a valid order by' })
      .default('asc'),
  })
  .extend(IdUserSchema.shape);
