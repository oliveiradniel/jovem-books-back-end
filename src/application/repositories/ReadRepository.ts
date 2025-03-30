import { prismaClient } from '../lib/prismaClient';

import { Read } from '@prisma/client';

import {
  ICreate,
  IDelete,
  IFindReadById,
  IUpdate,
  IReadRepository,
} from './interfaces/IReadRepository';

export class ReadRepository implements IReadRepository {
  async findById({ bookId }: IFindReadById): Promise<Read | null> {
    const read = await prismaClient.read.findUnique({
      where: {
        bookId,
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
