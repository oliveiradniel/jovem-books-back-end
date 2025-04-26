import { prismaClient } from '../lib/prismaClient';

import { IRead } from '../../@types/IRead';

import {
  IReadRepository,
  TListReads,
  TGetReadByBookId,
  TCreateRead,
  TUpdateRead,
  TDeleteRead,
} from './interfaces/IReadRepository';

export class ReadRepository implements IReadRepository {
  async list({ userId }: TListReads): Promise<IRead[]> {
    const books = await prismaClient.book.findMany({
      where: { userId, read: { isNot: null } },
      select: {
        read: true,
      },
    });

    const reads = books.map(book => book.read) as IRead[];

    return reads;
  }

  async findById({
    bookId,
  }: Omit<TGetReadByBookId, 'userId'>): Promise<IRead | null> {
    const read = await prismaClient.read.findUnique({
      where: {
        bookId,
      },
    });

    return read;
  }

  async create(data: Omit<TCreateRead, 'userId'>): Promise<IRead> {
    const read = await prismaClient.read.create({
      data,
    });

    return read;
  }

  async update({
    bookId,
    ...data
  }: Omit<TUpdateRead, 'userId'>): Promise<IRead> {
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
