import { z } from 'zod';

import { BaseBookSchema } from './BaseBookSchema';
import { IdBookSchema } from './IdBookSchema';

export const UpdateBookSchema = BaseBookSchema.omit({
  numberOfPages: true,
}).extend({
  bookId: IdBookSchema,
  imagePath: z
    .string({ message: 'Image path must be a string' })
    .nullable()
    .default(null),
  removeImage: z.boolean().optional().default(false),
});
