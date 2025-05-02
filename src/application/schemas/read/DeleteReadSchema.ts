import { z } from 'zod';

import { IdUserSchema } from '../user/IdUserSchema';
import { IdBookSchema } from '../book';

export const DeleteReadSchema = z.object({
  userId: IdUserSchema,
  bookId: IdBookSchema,
});
