import { prismaClient } from '../lib/prismaClient';

import { Read } from '@prisma/client';

import {
  ICreate,
  IDelete,
  IList,
  IFindReadById,
  IUpdate,
  IReadRepository,
} from './interfaces/IReadRepository';

export class ReadRepository implements IReadRepository {
  async list({ userId }: IList): Promise<Read[]> {
    const reads = await prismaClient.read.findMany({
      where: { userId },
    });

    return reads;
  }

  async findById({ bookId, userId }: IFindReadById): Promise<Read | null> {
    const read = await prismaClient.read.findUnique({
      where: {
        bookId,
        userId,
      },
    });

    return read;
  }

  async create({ bookId, userId, data }: ICreate): Promise<void> {
    await prismaClient.read.create({
      data: {
        bookId,
        userId,
        ...data,
      },
    });
  }

  async update({ bookId, userId, data }: IUpdate): Promise<void> {
    await prismaClient.read.update({
      where: { bookId, userId },
      data,
    });
  }

  async delete({ bookId, userId }: IDelete): Promise<void> {
    await prismaClient.read.delete({
      where: {
        bookId,
        userId,
      },
    });
  }
}
