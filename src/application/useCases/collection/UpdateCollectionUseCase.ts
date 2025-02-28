import { Collection } from '@prisma/client';

import { UserNotFound } from '../../errors/user/UserNotFound';
import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';
import { NameAlreadyInUse } from '../../errors/collection/NameAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  collectionId: string;
  data: Omit<Collection, 'id' | 'createdAt'>;
}

export class UpdateCollectionUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ collectionId, data }: IInput): Promise<void> {
    const { userId } = data;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const collection = await this.collectionRepository.findById({
      id: collectionId,
      userId,
    });

    if (!collection) {
      throw new CollectionNotFound();
    }

    const isNameInUse = await this.collectionRepository.findByName({
      userId,
      name: data.name,
    });

    if (isNameInUse && isNameInUse.id !== collectionId) {
      throw new NameAlreadyInUse();
    }

    await this.collectionRepository.update({
      id: collectionId,
      data,
    });
  }
}
