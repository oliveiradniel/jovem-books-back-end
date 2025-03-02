import { prismaClient } from '../lib/prismaClient';

import { Collection } from '@prisma/client';

import {
  ICollectionRepository,
  ICreate,
  IDelete,
  IList,
  IFindCollectionById,
  IUpdate,
  IFindCollectionByName,
} from './interfaces/ICollectionRepository';

export class CollectionRepository implements ICollectionRepository {
  async list({ userId, orderBy }: IList): Promise<Collection[]> {
    const collections = await prismaClient.collection.findMany({
      where: { userId },
      orderBy: {
        name: orderBy,
      },
    });

    return collections;
  }

  async findById({
    collectionId,
    userId,
  }: IFindCollectionById): Promise<Collection | null> {
    const collection = await prismaClient.collection.findUnique({
      where: { id: collectionId, userId },
    });

    return collection;
  }

  async findByName({
    name,
    userId,
  }: IFindCollectionByName): Promise<Collection | null> {
    const collection = await prismaClient.collection.findFirst({
      where: { name, userId },
    });

    return collection;
  }

  async create(data: ICreate): Promise<any> {
    await prismaClient.collection.create({
      data,
    });
  }

  async update({ collectionId, userId, data }: IUpdate): Promise<void> {
    await prismaClient.collection.update({
      where: { id: collectionId, userId },
      data,
    });
  }

  async delete({ collectionId, userId }: IDelete): Promise<void> {
    await prismaClient.collection.delete({
      where: { id: collectionId, userId },
    });
  }
}
