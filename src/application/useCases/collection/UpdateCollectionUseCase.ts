import { Collection } from '@prisma/client';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetCollectionByIdUseCase } from './GetCollectionByIdUseCase';
import { GetCollectionByNameUseCase } from './GetCollectionByNameUseCase';

import { NameAlreadyInUse } from '../../errors/collection/NameAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';

type IInput = Omit<Collection, 'createdAt'>;

export class UpdateCollectionUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly getCollectionByIdUseCase: GetCollectionByIdUseCase,
    private readonly getCollectionByNameUseCase: GetCollectionByNameUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute(data: IInput): Promise<void> {
    const { userId } = data;

    await this.getUserByIdUseCase.execute(userId);

    await this.getCollectionByIdUseCase.execute({
      collectionId: data.id,
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
      collectionDataWithTheNameInUse.id !== data.id
    ) {
      throw new NameAlreadyInUse();
    }

    await this.collectionRepository.update({
      id: data.id,
      data,
    });
  }
}
