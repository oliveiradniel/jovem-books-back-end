import { z } from 'zod';

export const UsernameSchema = z
  .string({ message: 'Username must be a string' })
  .min(5, 'Username must be at least 5 characters long');
