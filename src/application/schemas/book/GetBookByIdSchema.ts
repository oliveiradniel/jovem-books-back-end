import { z } from 'zod';

import { IdBookSchema } from './IdBookSchema';
import { IdUserSchema } from '../UserSchemas';

export const GetBookByIdSchema = z.object({
  ...IdUserSchema.shape,
  ...IdBookSchema.shape,
});
