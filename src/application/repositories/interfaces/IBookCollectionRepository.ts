import { Book, BookCollection, Collection } from '@prisma/client';

export interface IBookCollectionRepository {
  listBooksByCollectionId({
    collectionId,
    userId,
  }: {
    collectionId: string;
    userId: string;
  }): Promise<Book[]>;
  listCollectionsByBookId({
    bookId,
    userId,
  }: {
    bookId: string;
    userId: string;
  }): Promise<Collection[]>;
  findById({
    bookCollectionId,
    userId,
  }: {
    bookCollectionId: {
      bookId: string;
      collectionId: string;
    };
    userId: string;
  }): Promise<BookCollection | null>;
  create({
    bookId,
    collectionId,
    userId,
  }: {
    bookId: string;
    collectionId: string;
    userId: string;
  }): Promise<void>;
  delete({
    bookCollectionId,
    userId,
  }: {
    bookCollectionId: {
      bookId: string;
      collectionId: string;
    };
    userId: string;
  }): Promise<void>;
}
