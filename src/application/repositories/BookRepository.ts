import { prismaClient } from '../lib/prismaClient';

import { IBook } from '../../@types/IBook';

import {
  IBookRepository,
  ICreate,
  IDelete,
  IList,
  IFindBookById,
  IUpdate,
} from './interfaces/IBookRepository';

export class BookRepository implements IBookRepository {
  private static bookSelect = {
    id: true,
    title: true,
    authors: true,
    sinopse: true,
    imagePath: true,
    literaryGenre: true,
    numberOfPages: true,
    read: {
      select: {
        status: true,
        currentPage: true,
        createdAt: true,
        finishedAt: true,
      },
    },
  };

  private static getBookSelect() {
    return this.bookSelect;
  }

  async list({ userId, orderBy }: IList): Promise<IBook[]> {
    const books = await prismaClient.book.findMany({
      where: { userId },
      orderBy: {
        title: orderBy,
      },
      select: BookRepository.getBookSelect(),
    });

    return books;
  }

  async findById({ bookId, userId }: IFindBookById): Promise<IBook | null> {
    const book = await prismaClient.book.findUnique({
      where: { id: bookId, userId },
      select: BookRepository.getBookSelect(),
    });

    return book;
  }

  async findByTitle({
    title,
    userId,
  }: {
    title: string;
    userId: string;
  }): Promise<IBook | null> {
    const book = await prismaClient.book.findFirst({
      where: { title, userId },
      select: BookRepository.getBookSelect(),
    });

    return book;
  }

  async findByAuthor({
    authorName,
    userId,
  }: {
    authorName: string;
    userId: string;
  }): Promise<IBook[] | null> {
    const book = await prismaClient.book.findMany({
      where: {
        authors: {
          has: authorName,
        },
        userId,
      },
      select: BookRepository.getBookSelect(),
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

  async update({ bookId, userId, data }: IUpdate): Promise<IBook> {
    const book = await prismaClient.book.update({
      where: { id: bookId, userId },
      data,
      include: { read: true },
    });

    return book;
  }

  async delete({ bookId, userId }: IDelete): Promise<void> {
    await prismaClient.book.delete({
      where: { id: bookId, userId },
    });
  }
}
