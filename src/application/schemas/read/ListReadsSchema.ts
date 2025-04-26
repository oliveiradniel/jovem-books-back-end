import { z } from 'zod';
import { IdUserSchema } from '../UserSchemas';

export const ListReadsSchema = z.object({
  userId: IdUserSchema,
});
