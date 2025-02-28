import { NameAlreadyInUse } from '../../errors/collection/NameAlreadyInUse';
import { UserNotFound } from '../../errors/user/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  userId: string;
  name: string;
}

export class CreateBookUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ userId, name }: IInput): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

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
