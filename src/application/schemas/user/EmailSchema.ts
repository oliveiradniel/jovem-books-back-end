import { z } from 'zod';

export const EmailSchema = z
  .string({ message: 'E-mail must be a string' })
  .email('Enter a valid email');
