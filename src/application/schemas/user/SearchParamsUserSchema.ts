import { z } from 'zod';

import { UsernameSchema } from './UsernameSchema';
import { EmailSchema } from './EmailSchema';

export const SearchParamsUserSchema = z.object({
  username: UsernameSchema,
  email: EmailSchema,
  shouldReturn: z.boolean().default(false).optional(),
});
