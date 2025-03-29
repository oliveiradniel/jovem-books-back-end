import { z } from 'zod';

import { GenreLiterary } from '@prisma/client';

export const CreateDataBookSchema = z.object({
  title: z
    .string({ message: 'Title must be a string' })
    .min(5, 'Title must be at least 5 characters'),
  authors: z
    .array(
      z
        .string({ message: 'Author must be a string' })
        .min(4, 'Author must be at least 4 characters'),
    )
    .default([]),
  sinopse: z
    .string({ message: 'Sinopse must be a string' })
    .min(10, 'Sinopse must be at least 10 characters')
    .optional(),
  numberOfPages: z
    .number({ message: 'Number of pages must be a number' })
    .optional(),
  genreLiterary: z.array(
    z.nativeEnum(GenreLiterary, { message: 'Enter a valid genre literary' }),
  ),
  dateOfPublication: z.date({ message: 'Enter a valid date' }).optional(),
});
