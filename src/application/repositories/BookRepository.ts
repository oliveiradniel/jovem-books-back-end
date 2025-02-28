import { prismaClient } from '../lib/prismaClient';

import { Book } from '@prisma/client';

import { IBookRepository } from './interfaces/IBookRepository';

import { TOrderBy } from '../../@types/TOrderBy';

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
    orderBy: TOrderBy;
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
  }): Promise<Book | null> {
    const book = await prismaClient.book.findFirst({
      where: { title, userId },
    });

    return book ? book : null;
  }

  async findByAuthor({
    authorName,
    userId,
  }: {
    authorName: string;
    userId: string;
  }): Promise<Book[] | null> {
    const book = await prismaClient.book.findMany({
      where: { author: authorName, userId },
    });

    return book;
  }

  async create(data: BookDataCreate): Promise<any> {
    await prismaClient.book.create({
      data,
    });
  }

  async update({ id, data }: IUpdate): Promise<void> {
    await prismaClient.book.update({
      where: { id, userId: data.userId },
      data,
    });
  }

  async delete({ id, userId }: { id: string; userId: string }): Promise<void> {
    await prismaClient.book.delete({
      where: { id, userId },
    });
  }
}
