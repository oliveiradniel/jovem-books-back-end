import { prismaClient } from '../lib/prismaClient';

import { TBook } from '../../@types/Book';

import {
  IBookRepository,
  TCreateBook,
  TListBooks,
  TGetBookById,
  TGetBookByTitle,
  TGetBookByAuthor,
  TUpdateBook,
  TDeleteBook,
} from './interfaces/IBookRepository';

export class BookRepository implements IBookRepository {
  private static bookSelect = {
    id: true,
    userId: true,
    title: true,
    authors: true,
    sinopse: true,
    imagePath: true,
    literaryGenre: true,
    numberOfPages: true,
    dateOfPublication: true,
    createdAt: true,
    read: {
      select: {
        bookId: true,
        status: true,
        currentPage: true,
        createdAt: true,
        finishedAt: true,
        notes: true,
      },
    },
  };

  private static getBookSelect() {
    return this.bookSelect;
  }

  async list({ userId, orderBy }: TListBooks): Promise<TBook[]> {
    const books = await prismaClient.book.findMany({
      where: { userId },
      orderBy: {
        title: orderBy,
      },
      select: BookRepository.getBookSelect(),
    });

    return books;
  }

  async findById({ bookId, userId }: TGetBookById): Promise<TBook | null> {
    const book = await prismaClient.book.findUnique({
      where: { id: bookId, userId },
      select: BookRepository.getBookSelect(),
    });

    return book;
  }

  async findByTitle({ title, userId }: TGetBookByTitle): Promise<TBook | null> {
    const book = await prismaClient.book.findFirst({
      where: { title, userId },
      select: BookRepository.getBookSelect(),
    });

    return book;
  }

  async findByAuthor({
    author,
    userId,
  }: TGetBookByAuthor): Promise<TBook[] | null> {
    const book = await prismaClient.book.findMany({
      where: {
        authors: {
          has: author,
        },
        userId,
      },
      select: BookRepository.getBookSelect(),
    });

    return book;
  }

  async create(data: TCreateBook): Promise<TBook> {
    const book = await prismaClient.book.create({
      data,
      select: BookRepository.getBookSelect(),
    });

    return book;
  }

  async update({
    userId,
    bookId,
    ...data
  }: Omit<TUpdateBook, 'removeImage'>): Promise<TBook> {
    const book = await prismaClient.book.update({
      where: { id: bookId, userId },
      data,
      include: { read: true },
    });

    return book;
  }

  async delete({ bookId, userId }: TDeleteBook): Promise<void> {
    await prismaClient.book.delete({
      where: { id: bookId, userId },
    });
  }
}
