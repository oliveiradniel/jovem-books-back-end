import { z } from 'zod';

import { IdUserSchema } from '../user/IdUserSchema';
import { IdBookSchema } from '../book';

export const BaseReadSchema = z.object({
  bookId: IdBookSchema,
  userId: IdUserSchema,
});
