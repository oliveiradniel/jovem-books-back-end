import { User } from '@prisma/client';

import { UserNotFound } from '../../errors/user/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IUserRepository,
  TGetUserById,
} from '../../repositories/interfaces/IUserRepository';

export class GetUserByIdUseCase implements IUseCase<TGetUserById, User> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(userId: TGetUserById): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
