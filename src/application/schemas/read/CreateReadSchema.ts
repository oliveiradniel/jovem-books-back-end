import { z } from 'zod';

import { ReadingStatus } from '@prisma/client';

export const CreateReadSchema = z.object({
  currentPage: z
    .number({ message: 'Current page must be a number' })
    .optional(),
  status: z
    .nativeEnum(ReadingStatus, {
      message: 'Enter a valid reading status',
    })
    .default('READING'),
  note: z.string({ message: 'Note must be a string' }).optional(),
});
