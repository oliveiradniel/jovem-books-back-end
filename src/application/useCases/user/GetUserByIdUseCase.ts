import { User } from '@prisma/client';

import { UserNotFound } from '../../errors/user/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  userId: string;
}

export class GetUserByIdUseCase implements IUseCase<IInput, User> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ userId }: IInput): Promise<User> {
    const user = await this.userRepository.findById({ userId });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
