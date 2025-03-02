import { User } from '@prisma/client';

import { EmailAlreadyInUse } from '../../errors/user/EmailAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  email: string;
  shouldReturn?: boolean;
}

export class GetUserByEmailUseCase implements IUseCase<IInput, User | void> {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute({ email, shouldReturn = false }: IInput): Promise<User | void> {
    const user = await this.userRepository.findByEmail({ email });

    if (shouldReturn && user) {
      return user;
    }

    if (user) {
      throw new EmailAlreadyInUse();
    }
  }
}
