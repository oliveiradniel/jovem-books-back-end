import { z } from 'zod';

export const GetGoogleBookByTitleSchema = z.object({
  title: z.string({ message: 'Title must be a string' }),
  startIndex: z.number({ message: 'Start index must be a number' }),
  maxResults: z.number({ message: 'Max results must be a number' }),
});
