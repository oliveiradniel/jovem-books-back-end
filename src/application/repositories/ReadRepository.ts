import { prismaClient } from '../lib/prismaClient';

import { TRead } from '../../@types/Read';

import {
  IReadRepository,
  TListReads,
  TGetReadByBookId,
  TCreateRead,
  TUpdateRead,
  TDeleteRead,
} from './interfaces/IReadRepository';

export class ReadRepository implements IReadRepository {
  async list({ userId }: TListReads): Promise<TRead[]> {
    const books = await prismaClient.book.findMany({
      where: { userId, read: { isNot: null } },
      select: {
        read: true,
      },
    });

    const reads = books.map(book => book.read) as TRead[];

    return reads;
  }

  async findById({
    bookId,
  }: Omit<TGetReadByBookId, 'userId'>): Promise<TRead | null> {
    const read = await prismaClient.read.findUnique({
      where: {
        bookId,
      },
    });

    return read;
  }

  async create(data: Omit<TCreateRead, 'userId'>): Promise<TRead> {
    const read = await prismaClient.read.create({
      data,
    });

    return read;
  }

  async update({
    bookId,
    ...data
  }: Omit<TUpdateRead, 'userId'>): Promise<TRead> {
    const read = await prismaClient.read.update({
      where: { bookId },
      data,
    });

    return read;
  }

  async delete({ bookId }: Omit<TDeleteRead, 'userId'>): Promise<void> {
    await prismaClient.read.delete({
      where: {
        bookId,
      },
    });
  }
}
