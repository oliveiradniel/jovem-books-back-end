import { z } from 'zod';

import { GenreLiterary } from '@prisma/client';

export const CreateDataBookSchema = z.object({
  title: z
    .string({ message: 'Title must be a string' })
    .min(3, 'Title must be at least 3 characters'),
  authors: z
    .array(
      z
        .string({ message: 'Author must be a string' })
        .min(3, 'Author must be at least 3 characters'),
      { message: 'Authors is required' },
    )
    .min(1, 'The authors array needs at least one author'),
  sinopse: z.string({ message: 'Sinopse must be a string' }).optional(),
  numberOfPages: z.number({ message: 'Number of pages must be a number' }),
  genreLiterary: z
    .array(
      z.nativeEnum(GenreLiterary, { message: 'Enter a valid genre literary' }),
      { message: 'Literary genre must be a string' },
    )
    .min(1, 'The genre literary array needs at least one genre literary'),
});
