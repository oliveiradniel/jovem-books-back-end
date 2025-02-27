import { Book } from '@prisma/client';

import { TOrderBy } from '../../../@types/TOrderBy';

export interface IBookRepository {
  list({
    userId,
    orderBy,
  }: {
    userId: string;
    orderBy: TOrderBy;
  }): Promise<Book[] | null>;
  findById({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<Book | null>;
  findByTitle({
    title,
    userId,
  }: {
    title: string;
    userId: string;
  }): Promise<Book | null>;
  findByAuthor({
    authorName,
    userId,
  }: {
    authorName: string;
    userId: string;
  }): Promise<Book[] | null>;
  create(
    data: Omit<Omit<Omit<Partial<Book>, 'id'>, 'createdAt'>, 'updatedAt'>,
  ): Promise<string>;
  update({
    id,
    data,
  }: {
    id: string;
    data: Omit<Partial<Omit<Book, 'id'>>, 'createdAt'>;
  }): Promise<void>;
  delete({ id, userId }: { id: string; userId: string }): Promise<void>;
}
