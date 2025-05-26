import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetCollectionByIdUseCase } from './GetCollectionByIdUseCase';

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

    await this.getCollectionByIdUseCase.execute({
      collectionId,
      userId,
    });

    await this.collectionRepository.delete({ collectionId, userId });
  }
}
