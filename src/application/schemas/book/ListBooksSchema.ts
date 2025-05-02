import { z } from 'zod';

import { IdUserSchema } from '../user/IdUserSchema';

export const ListBooksSchema = z.object({
  userId: IdUserSchema,
  orderBy: z
    .enum(['asc', 'desc'], { message: 'Enter a valid order by' })
    .default('asc'),
});
