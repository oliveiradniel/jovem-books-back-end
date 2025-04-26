import { z } from 'zod';

import { ReadingStatus } from '@prisma/client';
import { IdBookSchema } from '../book';
import { IdUserSchema } from '../UserSchemas';

export const BaseReadSchema = z.object({
  bookId: IdBookSchema,
  userId: IdUserSchema,
  currentPage: z
    .number({ message: 'Current page must be a number' })
    .optional(),
  status: z
    .nativeEnum(ReadingStatus, {
      message: 'Enter a valid reading status',
    })
    .optional()
    .default('READING'),
  note: z.string({ message: 'Note must be a string' }).optional(),
  finishedAt: z.date({ message: 'Enter a valid date' }).optional().nullable(),
});
