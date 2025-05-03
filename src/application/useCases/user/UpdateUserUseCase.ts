import { GetUserByIdUseCase } from './GetUserByIdUseCase';
import { GetUserByEmailUseCase } from './GetUserByEmailUseCase';
import { GetUserByUsernameUseCase } from './GetUserByUsernameUseCase';

import { EmailAlreadyInUse } from '../../errors/user/EmailAlreadyInUse';
import { UsernameAlreadyInUse } from '../../errors/user/UsernameAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IUserRepository,
  TUpdateUser,
} from '../../repositories/interfaces/IUserRepository';

export class UpdateUserUseCase implements IUseCase<TUpdateUser, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
  ) {}

  async execute({ userId, removeImage, ...data }: TUpdateUser) {
    await this.getUserByIdUseCase.execute(userId);

    if (data.email) {
      const userDataWithTheEmailInUse =
        await this.getUserByEmailUseCase.execute({
          email: data.email,
          shouldReturn: true,
        });

      if (
        userDataWithTheEmailInUse &&
        userDataWithTheEmailInUse.id !== userId
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
        userDataWithTheUsernameInUse.id !== userId
      )
        throw new UsernameAlreadyInUse();
    }

    if (!this.userRepository?.update) {
      return;
    }

    await this.userRepository.update({ userId, ...data });
  }
}
