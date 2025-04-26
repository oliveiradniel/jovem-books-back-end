import { z } from 'zod';

import { SearchParamsBookSchema } from './SearchParamsBookSchema';

export const GetBookByTitleSchema = SearchParamsBookSchema.omit({
  author: true,
}).extend({ shouldReturn: z.boolean().default(false).optional() });
