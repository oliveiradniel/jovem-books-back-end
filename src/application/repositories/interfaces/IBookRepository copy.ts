import { Book } from '@prisma/client';

export interface IBookRepository {
  list(): Promise<Book[] | null>;
  findById(id: string): Promise<Book | null>;
  findByName(name: string): Promise<Book[] | null>;
  findByAuthor(authorName: string): Promise<Book[] | null>;
  create(
    data: Omit<Omit<Partial<Omit<Book, 'id'>>, 'createdAt'>, 'updatedAt'>,
  ): Promise<any>;
  update(
    id: string,
    data: Omit<Partial<Omit<Book, 'id'>>, 'createdAt'>,
  ): Promise<void>;
  delete(id: string): Promise<void>;
}
