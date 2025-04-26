import { z } from 'zod';

import { IdBookSchema } from './IdBookSchema';
import { IdUserSchema } from '../UserSchemas';

export const DeleteBookSchema = z.object({
  userId: IdUserSchema,
  bookId: IdBookSchema,
});
