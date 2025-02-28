import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';
import { UserNotFound } from '../../errors/user/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { ICollectionRepository } from '../../repositories/interfaces/ICollectionRepository';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  collectionId: string;
  userId: string;
}

export class DeleteCollectionUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly collectionRepository: ICollectionRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ userId, collectionId }: IInput): Promise<void> {
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

    await this.collectionRepository.delete({ id: collectionId, userId });
  }
}
