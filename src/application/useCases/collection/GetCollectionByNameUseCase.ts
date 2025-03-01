import { Collection } from '@prisma/client';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { NameAlreadyInUse } from '../../errors/collection/NameAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';

interface IInput {
  name: string;
  userId: string;
  shouldReturn?: boolean;
}

export class GetCollectionByNameUseCase
  implements IUseCase<IInput, Collection | void>
{
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({
    name,
    userId,
    shouldReturn = false,
  }: IInput): Promise<Collection | void> {
    await this.getUserByIdUseCase.execute(userId);

    const collection = await this.collectionRepository.findByName({
      name,
      userId,
    });

    if (shouldReturn && collection) {
      return collection;
    }

    if (!collection) {
      throw new NameAlreadyInUse();
    }
  }
}
