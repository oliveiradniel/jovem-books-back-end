import { Collection } from '@prisma/client';

import { TOrderBy } from '../../../@types/TOrderBy';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';

interface IInput {
  userId: string;
  orderBy?: TOrderBy;
}

export class ListCollectionsUseCase
  implements IUseCase<IInput, Collection[] | void>
{
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({
    userId,
    orderBy = 'asc',
  }: IInput): Promise<Collection[] | void> {
    await this.getUserByIdUseCase.execute({ userId });

    if (!this.collectionRepository?.list) {
      return;
    }

    const collections = await this.collectionRepository.list({
      userId,
      orderBy,
    });

    return collections;
  }
}
