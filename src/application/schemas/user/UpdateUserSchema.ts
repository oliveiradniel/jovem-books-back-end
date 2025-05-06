import { z } from 'zod';

import { IdUserSchema } from './IdUserSchema';

import { BaseUserSchema } from './BaseUserSchema';

export const UpdateUserSchema = BaseUserSchema.extend({
  userId: IdUserSchema,
  imagePath: z
    .string({ message: 'Image path must be a string' })
    .nullable()
    .default(null),
  removeImage: z
    .boolean({ message: 'Must be a boolean' })
    .optional()
    .default(false),
});
