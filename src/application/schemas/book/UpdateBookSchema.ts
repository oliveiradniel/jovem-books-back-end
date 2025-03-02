import { z } from 'zod';

import { TypeBook } from '@prisma/client';

export const IdsSchema = z.object({
  bookId: z
    .string({ message: 'Book id must be a string' })
    .uuid('Enter a valid book id'),
  userId: z
    .string({ message: 'User id must be a string' })
    .uuid('Enter a valid user id'),
});

export const UpdateDataBookSchema = z.object({
  title: z
    .string({ message: 'Title must be a string' })
    .min(5, 'Title must be at least 5 characters'),
  author: z
    .string({ message: 'Author must be a string' })
    .min(8, 'Author must be at least 8 characters')
    .optional(),
  sinopse: z
    .string({ message: 'Sinopse must be a string' })
    .min(30, 'Sinopse must be at least 30 characters')
    .optional(),
  numberOfPages: z
    .number({ message: 'Number of pages must be a number' })
    .optional(),
  type: z.nativeEnum(TypeBook, { message: 'Enter a valid type' }),
  dateOfPublication: z.date({ message: 'Enter a valid date' }).optional(),
  updatedAt: z.date({ message: 'Enter a valid date' }),
});
