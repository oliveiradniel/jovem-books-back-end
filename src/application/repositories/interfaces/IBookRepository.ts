import { Book } from '@prisma/client';

import { TOrderBy } from '../../../@types/TOrderBy';

import { IRepository } from '../../interfaces/IRepository';
import { IBook } from '../../../@types/IBook';

type BookDataCreate = Omit<
  Partial<Book>,
  'id' | 'userId' | 'title' | 'genreLiterary' | 'createdAt' | 'updatedAt'
> &
  Pick<Book, 'title' | 'genreLiterary'>;

type BookDataUpdate = Omit<Partial<Book>, 'id' | 'createdAt'>;

export interface IList {
  userId: string;
  orderBy: TOrderBy;
}

export interface IFindBookById {
  bookId: string;
  userId: string;
}

export interface ICreate {
  userId: string;
  data: BookDataCreate;
}

export interface IUpdate {
  bookId: string;
  data: BookDataUpdate;
  userId: string;
}

export interface IDelete {
  bookId: string;
  userId: string;
}

export interface IFindBookByTitle {
  title: string;
  userId: string;
}

export interface IFindBookByAuthor {
  authorName: string;
  userId: string;
}

export interface IBookRepository
  extends IRepository<IBook, IFindBookById, ICreate, IDelete, IList, IUpdate> {
  findByTitle({ title, userId }: IFindBookByTitle): Promise<IBook | null>;
  findByAuthor({
    authorName,
    userId,
  }: IFindBookByAuthor): Promise<IBook[] | null>;
}
