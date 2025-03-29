import { prismaClient } from '../lib/prismaClient';

import { Book } from '@prisma/client';

import {
  IBookRepository,
  ICreate,
  IDelete,
  IList,
  IFindBookById,
  IUpdate,
} from './interfaces/IBookRepository';

export class BookRepository implements IBookRepository {
  async list({ userId, orderBy }: IList): Promise<Book[]> {
    const books = await prismaClient.book.findMany({
      where: { userId },
      orderBy: {
        title: orderBy,
      },
    });

    return books;
  }

  async findById({ bookId, userId }: IFindBookById): Promise<Book | null> {
    const book = await prismaClient.book.findUnique({
      where: { id: bookId, userId },
    });

    return book;
  }

  async findByTitle({
    title,
    userId,
  }: {
    title: string;
    userId: string;
  }): Promise<Book | null> {
    const book = await prismaClient.book.findFirst({
      where: { title, userId },
    });

    return book;
  }

  async findByAuthor({
    authorName,
    userId,
  }: {
    authorName: string;
    userId: string;
  }): Promise<Book[] | null> {
    const book = await prismaClient.book.findMany({
      where: {
        authors: {
          has: authorName,
        },
        userId,
      },
    });

    return book;
  }

  async create({ userId, data }: ICreate): Promise<any> {
    await prismaClient.book.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async update({ bookId, userId, data }: IUpdate): Promise<void> {
    await prismaClient.book.update({
      where: { id: bookId, userId },
      data,
    });
  }

  async delete({ bookId, userId }: IDelete): Promise<void> {
    await prismaClient.book.delete({
      where: { id: bookId, userId },
    });
  }
}
