import { z } from 'zod';

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
  literaryGenre: z
    .array(z.string({ message: 'Literary genre must be a string' }), {
      message: 'Literary genre required',
    })
    .min(1, 'The genre literary array needs at least one genre literary'),
  removeImage: z.string().optional(),
});
