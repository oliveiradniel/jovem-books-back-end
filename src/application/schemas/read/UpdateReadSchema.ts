import { z } from 'zod';

import { BaseReadSchema } from './BaseReadSchema';

import { ReadingStatus } from '@prisma/client';

export const UpdateReadSchema = BaseReadSchema.extend({
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
