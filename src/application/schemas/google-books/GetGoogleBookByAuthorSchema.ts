import { z } from 'zod';

export const GetGoogleBookByAuthorSchema = z.object({
  author: z.string({ message: 'Author name must be a string' }),
  // startIndex: z.number({ message: 'Start index must be a number' }),
  // maxResults: z.number({ message: 'Max results must be a number' }),
});
