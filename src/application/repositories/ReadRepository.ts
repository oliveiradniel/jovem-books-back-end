import { prismaClient } from '../lib/prismaClient';

import { Read } from '@prisma/client';

import { IReadRepository } from './interfaces/IReadRepository';

export class ReadRepository implements IReadRepository {
  async list({ userId }: { userId: string }): Promise<Read[] | null> {
    const reads = await prismaClient.read.findMany({
      where: { userId },
    });

    return reads;
  }

  async findById({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<Read | null> {
    const read = await prismaClient.read.findUnique({
      where: {
        id,
        userId,
      },
    });

    return read;
  }

  async create(
    data: Partial<Omit<Read, 'id' | 'createdAt' | 'updatedAt' | 'userId'>> & {
      id: string;
      userId: string;
    },
  ): Promise<void> {
    await prismaClient.read.create({
      data,
    });
  }

  async update(
    data: Partial<Omit<Read, 'id' | 'createdAt' | 'userId'>> & {
      id: string;
      userId: string;
    },
  ): Promise<void> {
    await prismaClient.read.update({
      where: { id: data.id, userId: data.userId },
      data,
    });
  }

  async delete({ id, userId }: { id: string; userId: string }): Promise<void> {
    await prismaClient.read.delete({
      where: {
        id,
        userId,
      },
    });
  }
}
