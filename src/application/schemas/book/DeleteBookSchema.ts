import { z } from 'zod';

import { IdUserSchema } from '../user/IdUserSchema';
import { IdBookSchema } from './IdBookSchema';

export const DeleteBookSchema = z.object({
  userId: IdUserSchema,
  bookId: IdBookSchema,
});
