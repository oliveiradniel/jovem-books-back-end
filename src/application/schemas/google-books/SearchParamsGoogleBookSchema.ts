import { z } from 'zod';

export const SearchParamsGoogleBookSchema = z.object({
  startIndex: z.number({ message: 'Start index must be a number' }),
  title: z.string({ message: 'Title must be a string' }),
  author: z.string({ message: 'Author name must be a string' }),
});
