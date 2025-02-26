import { User } from '@prisma/client';

import { EmailAlreadyInUse } from '../../errors/user/EmailAlreadyInUse';
import { UsernameAlreadyInUse } from '../../errors/user/UsernameAlreadyInUse';
import { UserNotFound } from '../../errors/user/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  id: string;
  data: Omit<Partial<Omit<User, 'id'>>, 'createdAt'>;
}

export class UpdateUserUseCase implements IUseCase<IInput, void> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ id, data }: IInput) {
    if (
      !Object.values(data).some(value => value !== null && value !== undefined)
    ) {
      return;
    }

    const userExists = await this.userRepository.findById(id);

    if (!userExists) {
      throw new UserNotFound();
    }

    if (data.email) {
      const isEmailInUse = await this.userRepository.findByEmail(data.email);

      if (isEmailInUse && userExists.email !== data.email)
        throw new EmailAlreadyInUse();
    }

    if (data.username) {
      const isUsernameInUse = await this.userRepository.findByUsername(
        data.username,
      );

      if (isUsernameInUse && userExists.username !== data.username)
        throw new UsernameAlreadyInUse();
    }

    await this.userRepository.update({ id, data });
  }
}
