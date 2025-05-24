import { GetUserByIdUseCase } from './GetUserByIdUseCase';
import { GetUserByEmailUseCase } from './GetUserByEmailUseCase';
import { GetUserByUsernameUseCase } from './GetUserByUsernameUseCase';

import { EmailAlreadyInUse } from '../../errors/user/EmailAlreadyInUse';
import { UsernameAlreadyInUse } from '../../errors/user/UsernameAlreadyInUse';

import { DeleteObjectUseCase } from '../s3/DeleteObjectUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IUserRepository,
  TUpdateUser,
} from '../../repositories/interfaces/IUserRepository';

import { TUser } from '../../../@types/User';

export class UpdateUserUseCase implements IUseCase<TUpdateUser, TUser | null> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private readonly deleteObjectUseCase: DeleteObjectUseCase,
  ) {}

  async execute({
    userId,
    removeImage,
    ...data
  }: TUpdateUser): Promise<TUser | null> {
    const user = await this.getUserByIdUseCase.execute(userId);

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
      return null;
    }

    if (removeImage && user.imagePath) {
      console.log('aqui');
      await this.deleteObjectUseCase.execute({ key: user.imagePath });
    }

    if (user.imagePath && data.imagePath && user.imagePath !== data.imagePath) {
      await this.deleteObjectUseCase.execute({ key: user.imagePath });
    }

    return await this.userRepository.update({ userId, ...data });
  }
}
