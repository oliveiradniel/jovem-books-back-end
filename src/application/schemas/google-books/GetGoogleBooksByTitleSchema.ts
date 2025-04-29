import { z } from 'zod';

export const GetGoogleBooksByTitleSchema = z.string({
  message: 'Title must be a string',
});
