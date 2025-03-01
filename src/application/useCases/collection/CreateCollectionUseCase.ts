import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetCollectionByNameUseCase } from './GetCollectionByNameUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';

interface IInput {
  userId: string;
  name: string;
}

export class CreateBookUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly getCollectionByNameUseCase: GetCollectionByNameUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId, name }: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute(userId);

    await this.getCollectionByNameUseCase.execute({
      name,
      userId,
    });

    await this.collectionRepository.create({ name, userId });
  }
}
