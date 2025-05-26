import { prismaClient } from '../lib/prismaClient';

import { Book, BookCollection, Collection } from '@prisma/client';

import {
  IBookCollectionRepository,
  ICreate,
  IDelete,
  IFindBookCollectionById,
  IListBooksByCollectionId,
  IListCollectionsByBookId,
} from './interfaces/IBookCollectionRepository';

export class BookCollectionRepository implements IBookCollectionRepository {
  async listBooksByCollectionId({
    collectionId,
    userId,
  }: IListBooksByCollectionId): Promise<Book[]> {
    const bookCollections = await prismaClient.bookCollection.findMany({
      where: {
        collectionId,
        userId,
      },
      select: {
        book: true,
      },
    });

    const books = bookCollections.map(bookCollection => bookCollection.book);

    return books;
  }

  async listCollectionsByBookId({
    bookId,
    userId,
  }: IListCollectionsByBookId): Promise<Collection[]> {
    const bookCollections = await prismaClient.bookCollection.findMany({
      where: {
        bookId,
        userId,
      },
      select: {
        collection: true,
      },
    });

    const collections = bookCollections.map(
      bookCollection => bookCollection.collection,
    );

    return collections;
  }

  async findById({
    bookCollectionId,
    userId,
  }: IFindBookCollectionById): Promise<BookCollection | null> {
    const bookCollection = await prismaClient.bookCollection.findUnique({
      where: { bookId_collectionId: bookCollectionId, userId },
    });

    return bookCollection;
  }

  async create(data: ICreate): Promise<BookCollection> {
    const bookCollection = await prismaClient.bookCollection.create({
      data,
    });

    return bookCollection;
  }

  async delete({ bookCollectionId, userId }: IDelete): Promise<void> {
    await prismaClient.bookCollection.delete({
      where: { bookId_collectionId: bookCollectionId, userId },
    });
  }
}
