import { User } from '@prisma/client';

import { EmailAlreadyInUse } from '../../errors/user/EmailAlreadyInUse';
import { UsernameAlreadyInUse } from '../../errors/user/UsernameAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { GetUserByIdUseCase } from './GetUserByIdUseCase';

interface IInput {
  id: string;
  data: Omit<Partial<Omit<User, 'id'>>, 'createdAt'>;
}

export class UpdateUserUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ id, data }: IInput) {
    if (
      !Object.values(data).some(value => value !== null && value !== undefined)
    ) {
      return;
    }

    const user = await this.getUserByIdUseCase.execute(id);

    if (data.email) {
      const isEmailInUse = await this.userRepository.findByEmail(data.email);

      if (isEmailInUse && user.email !== data.email)
        throw new EmailAlreadyInUse();
    }

    if (data.username) {
      const isUsernameInUse = await this.userRepository.findByUsername(
        data.username,
      );

      if (isUsernameInUse && user.username !== data.username)
        throw new UsernameAlreadyInUse();
    }

    await this.userRepository.update({ id, data });
  }
}
