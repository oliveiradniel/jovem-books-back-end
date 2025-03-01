import { NameAlreadyInUse } from '../../errors/collection/NameAlreadyInUse';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';

interface IInput {
  userId: string;
  name: string;
}

export class CreateBookUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId, name }: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute(userId);

    const collection = await this.collectionRepository.findByName({
      name,
      userId,
    });

    if (collection) {
      throw new NameAlreadyInUse();
    }

    await this.collectionRepository.create({ name, userId });
  }
}
