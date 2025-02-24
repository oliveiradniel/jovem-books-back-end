import { z } from 'zod';

export const IdSchema = z
  .string({ message: 'Id must be a string' })
  .uuid({ message: 'Invalid uuid' });
