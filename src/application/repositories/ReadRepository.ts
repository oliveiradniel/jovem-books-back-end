import { prismaClient } from '../lib/prismaClient';

import { Read } from '@prisma/client';

import {
  ICreate,
  IDelete,
  IList,
  IFindReadById,
  IUpdate,
} from './interfaces/IReadRepository';
import { IRepository } from '../interfaces/IRepository';

export class ReadRepository
  implements IRepository<Read, IFindReadById, ICreate, IDelete, IList, IUpdate>
{
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

  async create(data: ICreate): Promise<void> {
    await prismaClient.read.create({
      data,
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
