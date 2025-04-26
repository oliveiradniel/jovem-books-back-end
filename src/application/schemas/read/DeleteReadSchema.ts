import { z } from 'zod';

import { IdBookSchema } from '../book';
import { IdUserSchema } from '../UserSchemas';

export const DeleteReadSchema = z.object({
  userId: IdUserSchema,
  bookId: IdBookSchema,
});
