import { User } from '@prisma/client';

import { GetUserByIdUseCase } from './GetUserByIdUseCase';
import { GetUserByEmailUseCase } from './GetUserByEmailUseCase';
import { GetUserByUsernameUseCase } from './GetUserByUsernameUseCase';

import { EmailAlreadyInUse } from '../../errors/user/EmailAlreadyInUse';
import { UsernameAlreadyInUse } from '../../errors/user/UsernameAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

type IInput = Partial<Omit<User, 'id' | 'createdAt'>> & Pick<User, 'id'>;

export class UpdateUserUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
  ) {}

  async execute(data: IInput) {
    if (
      !Object.values(data).some(value => value !== null && value !== undefined)
    ) {
      return;
    }
    await this.getUserByIdUseCase.execute(data.id);

    if (data.email) {
      const userDataWithTheEmailInUse =
        await this.getUserByEmailUseCase.execute({
          email: data.email,
          shouldReturn: true,
        });

      if (
        userDataWithTheEmailInUse &&
        userDataWithTheEmailInUse.id !== data.id
      ) {
        throw new EmailAlreadyInUse();
      }
    }

    if (data.username) {
      const userDataWithTheUsernameInUse =
        await this.getUserByUsernameUseCase.execute({
          username: data.username,
          shouldReturn: true,
        });

      if (
        userDataWithTheUsernameInUse &&
        userDataWithTheUsernameInUse.id !== data.id
      )
        throw new UsernameAlreadyInUse();
    }

    await this.userRepository.update({ id: data.id, data });
  }
}
