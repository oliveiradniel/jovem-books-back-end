import { z } from 'zod';

export const BaseBookSchema = z.object({
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid('Enter a valid user id'),
  title: z
    .string({ message: 'Title must be a string' })
    .min(3, 'Title must be at least 3 characters'),
  authors: z.array(
    z
      .string({ message: 'Author must be a string' })
      .min(3, 'Author must be at least 3 characters'),
    { message: 'Authors is required' },
  ),
  sinopse: z
    .string({ message: 'Sinopse must be a string' })
    .nullable()
    .default(null),
  numberOfPages: z.number({ message: 'Number of pages must be a number' }),
  literaryGenre: z
    .array(z.string({ message: 'Literary genre must be a string' }), {
      message: 'Literary genre required',
    })
    .min(1, 'The genre literary array needs at least one genre literary'),
});
