import { Book } from '@prisma/client';

export interface IBookRepository {
  list({
    userId,
    orderBy,
  }: {
    userId: string;
    orderBy: 'asc' | 'desc';
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
  }): Promise<Book[] | null>;
  findByAuthor({
    authorName,
    userId,
  }: {
    authorName: string;
    userId: string;
  }): Promise<Book[] | null>;
  create(
    data: Omit<Omit<Omit<Book, 'id'>, 'createdAt'>, 'updatedAt'>,
  ): Promise<string>;
  update({
    id,
    data,
    userId,
  }: {
    id: string;
    data: Omit<Partial<Omit<Book, 'id'>>, 'createdAt'>;
    userId: string;
  }): Promise<void>;
  delete({ id, userId }: { id: string; userId: string }): Promise<void>;
}
