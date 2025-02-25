import { User } from '@prisma/client';

import { UserRepository } from '../../repositories/UserRepository';

import { UserNotFound } from '../../errors/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

export class GetUserByIdUseCase implements IUseCase<string, User> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
