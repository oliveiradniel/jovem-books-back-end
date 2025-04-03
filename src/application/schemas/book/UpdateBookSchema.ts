import { z } from 'zod';

import { GenreLiterary } from '@prisma/client';

export const UpdateDataBookSchema = z.object({
  title: z
    .string({ message: 'Title must be a string' })
    .min(5, 'Title must be at least 5 characters')
    .optional(),
  authors: z
    .array(
      z
        .string({ message: 'Author must be a string' })
        .min(4, 'Author must be at least 4 characters'),
      { message: 'Authors is required' },
    )
    .optional(),
  sinopse: z
    .string({ message: 'Sinopse must be a string' })
    .min(30, 'Sinopse must be at least 30 characters')
    .optional(),
  numberOfPages: z
    .number({ message: 'Number of pages must be a number' })
    .optional(),
  genreLiterary: z
    .array(
      z.nativeEnum(GenreLiterary, { message: 'Enter a valid genre literary' }),
    )
    .optional(),
});
