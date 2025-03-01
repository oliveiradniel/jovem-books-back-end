import { User } from '@prisma/client';

import { UsernameAlreadyInUse } from '../../errors/user/UsernameAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  username: string;
  shouldReturn?: boolean;
}

export class GetUserByUsernameUseCase implements IUseCase<IInput, User | void> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    username,
    shouldReturn = false,
  }: IInput): Promise<User | void> {
    const user = await this.userRepository.findByUsername(username);

    if (shouldReturn && user) {
      return user;
    }

    if (user) {
      throw new UsernameAlreadyInUse();
    }
  }
}
