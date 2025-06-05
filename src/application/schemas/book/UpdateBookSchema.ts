import { z } from 'zod';

import { BaseBookSchema } from './BaseBookSchema';
import { IdBookSchema } from './IdBookSchema';

export const UpdateBookSchema = BaseBookSchema.omit({
  numberOfPages: true,
}).extend({
  bookId: IdBookSchema,
  removeImage: z.boolean().optional().default(false),
});
