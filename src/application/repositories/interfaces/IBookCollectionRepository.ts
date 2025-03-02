import { Book, BookCollection, Collection } from '@prisma/client';

import { IRepository } from '../../interfaces/IRepository';

export interface IFindBookCollectionById {
  bookCollectionId: {
    bookId: string;
    collectionId: string;
  };
  userId: string;
}

export interface ICreate {
  bookId: string;
  collectionId: string;
  userId: string;
}

export interface IDelete {
  bookCollectionId: {
    bookId: string;
    collectionId: string;
  };
  userId: string;
}

export interface IListBooksByCollectionId {
  collectionId: string;
  userId: string;
}

export interface IListCollectionsByBookId {
  bookId: string;
  userId: string;
}

export interface IBookCollectionRepository
  extends IRepository<
    BookCollection,
    IFindBookCollectionById,
    ICreate,
    IDelete
  > {
  listBooksByCollectionId({
    collectionId,
    userId,
  }: IListBooksByCollectionId): Promise<Book[]>;
  listCollectionsByBookId({
    bookId,
    userId,
  }: IListCollectionsByBookId): Promise<Collection[]>;
}
