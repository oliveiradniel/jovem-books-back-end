import { Collection } from '@prisma/client';

import { TOrderBy } from '../../../@types/TOrderBy';

import { UserNotFound } from '../../errors/user/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  userId: string;
  orderBy: TOrderBy;
}

export class ListCollectionsUseCase
  implements IUseCase<IInput, Collection[] | null>
{
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ userId, orderBy }: IInput): Promise<Collection[] | null> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const collections = await this.collectionRepository.list({
      userId,
      orderBy,
    });

    return collections;
  }
}
