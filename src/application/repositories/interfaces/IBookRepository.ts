import { z } from 'zod';

import { IRepository } from '../../interfaces/IRepository';

import { TBook } from '../../../@types/Book';

import {
  CreateBookSchema,
  DeleteBookSchema,
  GetBookByAuthorSchema,
  GetBookByIdSchema,
  GetBookByTitleSchema,
  ListBooksSchema,
  UpdateBookSchema,
} from '../../schemas/book';

export type TListBooks = z.infer<typeof ListBooksSchema>;

export type TGetBookById = z.infer<typeof GetBookByIdSchema>;

export type TGetBookByTitle = z.infer<typeof GetBookByTitleSchema>;

export type TGetBookByAuthor = z.infer<typeof GetBookByAuthorSchema>;

export type TCreateBook = z.infer<typeof CreateBookSchema>;

export type TUpdateBook = z.infer<typeof UpdateBookSchema>;

export type TDeleteBook = z.infer<typeof DeleteBookSchema>;

export interface IBookRepository
  extends IRepository<
    TBook,
    TGetBookById,
    TCreateBook,
    TDeleteBook,
    TListBooks,
    Omit<TUpdateBook, 'removeImage'>
  > {
  findByTitle({ title, userId }: TGetBookByTitle): Promise<TBook | null>;
  findByAuthor({ author, userId }: TGetBookByAuthor): Promise<TBook[] | null>;
}
