import { User } from '@prisma/client';

import { EmailAlreadyInUse } from '../../errors/EmailAlreadyInUse';
import { UsernameAlreadyInUse } from '../../errors/UsernameAlreadyInUse';
import { UserNotFound } from '../../errors/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  id: string;
  user: Omit<Partial<Omit<User, 'id'>>, 'createdAt'>;
}

export class UpdateUserUseCase implements IUseCase<IInput, void> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ id, user }: IInput) {
    if (
      !Object.values(user).some(value => value !== null && value !== undefined)
    ) {
      return;
    }

    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new UserNotFound();
    }

    if (user.email) {
      const isEmailInUse = await this.userRepository.findByEmail(user.email);

      if (isEmailInUse && userExists.email !== user.email)
        throw new EmailAlreadyInUse();
    }

    if (user.username) {
      const isUsernameInUse = await this.userRepository.findByUsername(
        user.username,
      );

      if (isUsernameInUse && userExists.username !== user.username)
        throw new UsernameAlreadyInUse();
    }

    await this.userRepository.update({ id, data: user });
  }
}
