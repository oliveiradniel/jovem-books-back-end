import { Collection } from '@prisma/client';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';

interface IInput {
  collectionId: string;
  userId: string;
}

export class GetCollectionByIdUseCase implements IUseCase<IInput, Collection> {
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ collectionId, userId }: IInput): Promise<Collection> {
    await this.getUserByIdUseCase.execute(userId);

    const collection = await this.collectionRepository.findById({
      collectionId,
      userId,
    });

    if (!collection) {
      throw new CollectionNotFound();
    }

    return collection;
  }
}
