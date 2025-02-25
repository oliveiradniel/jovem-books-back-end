import { prismaClient } from '../lib/prismaClient';

import { Book } from '@prisma/client';

import { IBookRepository } from './interfaces/IBookRepository copy';

type BookDataCreate = Omit<Omit<Omit<Book, 'id'>, 'createdAt'>, 'updatedAt'>;

type BookDataUpdate = Omit<Partial<Omit<Book, 'id'>>, 'createdAt'>;

interface IUpdate {
  id: string;
  data: BookDataUpdate;
  userId: string;
}

export class BookRepository implements IBookRepository {
  async list({
    userId,
    orderBy,
  }: {
    userId: string;
    orderBy: 'asc' | 'desc';
  }): Promise<Book[] | null> {
    const books = await prismaClient.book.findMany({
      where: { userId },
      orderBy: {
        title: orderBy,
      },
    });

    return books;
  }

  async findById({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<Book | null> {
    const book = await prismaClient.book.findUnique({
      where: { id, userId },
    });

    return book;
  }

  async findByTitle({
    title,
    userId,
  }: {
    title: string;
    userId: string;
  }): Promise<Book[] | null> {
    const books = await prismaClient.book.findMany({
      where: { title, userId },
    });

    return books;
  }

  async findByAuthor({
    authorName,
    userId,
  }: {
    authorName: string;
    userId: string;
  }): Promise<Book[] | null> {
    const books = await prismaClient.book.findMany({
      where: { author: authorName, userId },
    });

    return books;
  }

  async create(data: BookDataCreate): Promise<any> {
    const title = await prismaClient.book.create({
      data,
      select: {
        title: true,
      },
    });

    return title;
  }

  async update({ id, data, userId }: IUpdate): Promise<void> {
    await prismaClient.book.update({
      where: { id, userId },
      data,
    });
  }

  async delete({ id, userId }: { id: string; userId: string }): Promise<void> {
    await prismaClient.book.delete({
      where: { id, userId },
    });
  }
}
