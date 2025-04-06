import { z } from 'zod';

import { GenreLiterary } from '@prisma/client';

export const UpdateDataBookSchema = z.object({
  title: z
    .string({ message: 'Title must be a string' })
    .min(3, 'Title must be at least 3 characters')
    .optional(),
  authors: z
    .array(
      z
        .string({ message: 'Author must be a string' })
        .min(3, 'Author must be at least 3 characters'),
      { message: 'Authors is required' },
    )
    .optional(),
  sinopse: z.string({ message: 'Sinopse must be a string' }).optional(),
  numberOfPages: z
    .number({ message: 'Number of pages must be a number' })
    .optional(),
  genreLiterary: z
    .array(
      z.nativeEnum(GenreLiterary, { message: 'Enter a valid genre literary' }),
    )
    .optional(),
  removeImage: z.string().optional(),
});
