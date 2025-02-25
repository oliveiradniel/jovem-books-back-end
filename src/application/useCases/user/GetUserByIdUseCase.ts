import { User } from '@prisma/client';

import { UserNotFound } from '../../errors/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

export class GetUserByIdUseCase implements IUseCase<string, User> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
