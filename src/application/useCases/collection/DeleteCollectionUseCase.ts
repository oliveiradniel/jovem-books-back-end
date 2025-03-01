import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetCollectionByIdUseCase } from './GetCollectionByIdUseCase';

import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';

interface IInput {
  collectionId: string;
  userId: string;
}

export class DeleteCollectionUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly getCollectionByIdUseCase: GetCollectionByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId, collectionId }: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute(userId);

    const collection = await this.getCollectionByIdUseCase.execute({
      collectionId,
      userId,
    });

    if (!collection) {
      throw new CollectionNotFound();
    }

    await this.collectionRepository.delete({ id: collectionId, userId });
  }
}
