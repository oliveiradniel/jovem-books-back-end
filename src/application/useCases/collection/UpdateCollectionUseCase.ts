import { Collection } from '@prisma/client';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetCollectionByIdUseCase } from './GetCollectionByIdUseCase';

import { NameAlreadyInUse } from '../../errors/collection/NameAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';

interface IInput {
  collectionId: string;
  data: Omit<Collection, 'id' | 'createdAt'>;
}

export class UpdateCollectionUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly getCollectionByIdUseCase: GetCollectionByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ collectionId, data }: IInput): Promise<void> {
    const { userId } = data;

    await this.getUserByIdUseCase.execute(userId);

    await this.getCollectionByIdUseCase.execute({
      collectionId,
      userId,
    });

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
