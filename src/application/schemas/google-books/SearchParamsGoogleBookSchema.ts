import { z } from 'zod';

export const SearchParamsGoogleBookSchema = z.object({
  title: z.string({ message: 'Title must be a string' }),
  author: z.string({ message: 'Author name must be a string' }),
});
