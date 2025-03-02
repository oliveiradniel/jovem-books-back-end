import { prismaClient } from '../lib/prismaClient';

import { Book, BookCollection, Collection } from '@prisma/client';

import { IBookCollectionRepository } from './interfaces/IBookCollectionRepository';

export class BookCollectionRepository implements IBookCollectionRepository {
  async listBooksByCollectionId({
    collectionId,
    userId,
  }: {
    collectionId: string;
    userId: string;
  }): Promise<Book[]> {
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
  }: {
    bookId: string;
    userId: string;
  }): Promise<Collection[]> {
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
    bookId,
    collectionId,
    userId,
  }: {
    bookId: string;
    collectionId: string;
    userId: string;
  }): Promise<BookCollection | null> {
    const bookCollection = await prismaClient.bookCollection.findUnique({
      where: { bookId_collectionId: { bookId, collectionId }, userId },
    });

    return bookCollection;
  }

  async create({
    bookId,
    collectionId,
    userId,
  }: {
    bookId: string;
    collectionId: string;
    userId: string;
  }): Promise<void> {
    await prismaClient.bookCollection.create({
      data: {
        bookId,
        collectionId,
        userId,
      },
    });
  }

  async delete({
    bookId,
    collectionId,
    userId,
  }: {
    bookId: string;
    collectionId: string;
    userId: string;
  }): Promise<void> {
    await prismaClient.bookCollection.delete({
      where: { bookId_collectionId: { bookId, collectionId }, userId },
    });
  }
}
