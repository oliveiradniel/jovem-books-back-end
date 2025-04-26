import { z } from 'zod';

import { IdBookSchema } from '../book';
import { IdUserSchema } from '../UserSchemas';

export const GetReadByBookIdSchema = z.object({
  userId: IdUserSchema,
  bookId: IdBookSchema,
});
