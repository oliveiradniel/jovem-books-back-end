import { prismaClient } from '../lib/prismaClient';

import { IRead } from '../../@types/IRead';

import {
  ICreate,
  IDelete,
  IFindReadById,
  IUpdate,
  IReadRepository,
  IList,
} from './interfaces/IReadRepository';

export class ReadRepository implements IReadRepository {
  async list({ userId }: IList): Promise<IRead[]> {
    const books = await prismaClient.book.findMany({
      where: { userId, read: { isNot: null } },
      select: {
        title: true,
        read: true,
      },
    });

    return books;
  }

  async findById({ bookId }: IFindReadById): Promise<IRead | null> {
    const read = await prismaClient.book.findUnique({
      where: {
        id: bookId,
        read: { isNot: null },
      },
      select: {
        title: true,
        read: true,
      },
    });

    return read;
  }

  async create({ bookId, data }: ICreate): Promise<void> {
    await prismaClient.read.create({
      data: {
        bookId,
        ...data,
      },
    });
  }

  async update({ bookId, data }: IUpdate): Promise<void> {
    await prismaClient.read.update({
      where: { bookId },
      data,
    });
  }

  async delete({ bookId }: IDelete): Promise<void> {
    await prismaClient.read.delete({
      where: {
        bookId,
      },
    });
  }
}
