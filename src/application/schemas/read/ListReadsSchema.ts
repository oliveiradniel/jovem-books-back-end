import { z } from 'zod';

import { IdUserSchema } from '../user/IdUserSchema';

export const ListReadsSchema = z.object({
  userId: IdUserSchema,
});
