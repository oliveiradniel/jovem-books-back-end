import { prismaClient } from '../lib/prismaClient';

import { Collection } from '@prisma/client';

import { ICollectionRepository } from './interfaces/ICollectionRepository';

import { TOrderBy } from '../../@types/TOrderBy';

type CollectionDataCreate = Omit<
  Omit<Omit<Collection, 'id'>, 'createdAt'>,
  'updatedAt'
>;

type CollectionDataUpdate = Omit<Partial<Omit<Collection, 'id'>>, 'createdAt'>;

interface IUpdate {
  id: string;
  data: CollectionDataUpdate;
  userId: string;
}

export class CollectionRepository implements ICollectionRepository {
  async list({
    userId,
    orderBy,
  }: {
    userId: string;
    orderBy: TOrderBy;
  }): Promise<Collection[] | null> {
    const collections = await prismaClient.collection.findMany({
      where: { userId },
      orderBy: {
        name: orderBy,
      },
    });

    return collections;
  }

  async findById({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<Collection | null> {
    const collection = await prismaClient.collection.findUnique({
      where: { id, userId },
    });

    return collection;
  }

  async findByName({
    name,
    userId,
  }: {
    name: string;
    userId: string;
  }): Promise<Collection | null> {
    const collection = await prismaClient.collection.findFirst({
      where: { name, userId },
    });

    return collection ? collection : null;
  }

  async create(data: CollectionDataCreate): Promise<any> {
    await prismaClient.collection.create({
      data,
    });
  }

  async update({ id, data }: IUpdate): Promise<void> {
    await prismaClient.collection.update({
      where: { id, userId: data.userId },
      data,
    });
  }

  async delete({ id, userId }: { id: string; userId: string }): Promise<void> {
    await prismaClient.collection.delete({
      where: { id, userId },
    });
  }
}
