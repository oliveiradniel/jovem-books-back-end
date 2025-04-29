import { z } from 'zod';

export const GetGoogleBooksByAuthorSchema = z.string({
  message: 'Author name must be a string',
});
