import { Book, BookCollection, Collection } from '@prisma/client';
import { IBookCollectionRepository } from './interfaces/IBookCollectionRepository';
import { prismaClient } from '../lib/prismaClient';

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
  }): Promise<Collection[] | null> {
    const bookCollections = await prismaClient.bookCollection.findMany({
      where: {
        bookId,
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
  }: {
    bookCollectionId: string;
    userId: string;
  }): Promise<BookCollection | null> {
    const bookCollection = await prismaClient.bookCollectionMetadata.findUnique(
      { where: { id: bookCollectionId } },
    );

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
      where: { bookId_collectionId: { bookId, collectionId } },
    });
  }
}
