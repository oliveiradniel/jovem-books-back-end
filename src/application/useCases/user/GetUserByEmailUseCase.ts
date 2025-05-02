import { User } from '@prisma/client';

import { EmailAlreadyInUse } from '../../errors/user/EmailAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IUserRepository,
  TGetUserByEmail,
} from '../../repositories/interfaces/IUserRepository';

export class GetUserByEmailUseCase
  implements IUseCase<TGetUserByEmail, User | void>
{
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({
    email,
    shouldReturn,
  }: TGetUserByEmail): Promise<User | void> {
    const user = await this.userRepository.findByEmail(email);

    if (shouldReturn && user) {
      return user;
    }

    if (user) {
      throw new EmailAlreadyInUse();
    }
  }
}
