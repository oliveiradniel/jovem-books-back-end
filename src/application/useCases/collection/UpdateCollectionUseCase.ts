import { Collection } from '@prisma/client';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetCollectionByIdUseCase } from './GetCollectionByIdUseCase';
import { GetCollectionByNameUseCase } from './GetCollectionByNameUseCase';

import { NameAlreadyInUse } from '../../errors/collection/NameAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';

interface IInput {
  collectionId: string;
  userId: string;
  data: Omit<Collection, 'createdAt' | 'id' | 'userId'>;
}

export class UpdateCollectionUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly getCollectionByIdUseCase: GetCollectionByIdUseCase,
    private readonly getCollectionByNameUseCase: GetCollectionByNameUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ collectionId, userId, data }: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute(userId);

    await this.getCollectionByIdUseCase.execute({
      collectionId,
      userId,
    });

    const collectionDataWithTheNameInUse =
      await this.getCollectionByNameUseCase.execute({
        userId,
        name: data.name,
        shouldReturn: true,
      });

    if (
      collectionDataWithTheNameInUse &&
      collectionDataWithTheNameInUse.id !== collectionId
    ) {
      throw new NameAlreadyInUse();
    }

    if (!this.collectionRepository?.update) {
      return;
    }

    await this.collectionRepository.update({
      collectionId,
      userId,
      data,
    });
  }
}
