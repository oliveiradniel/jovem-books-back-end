import { GetUserByIdUseCase } from './GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IUserRepository,
  TDeleteUser,
} from '../../repositories/interfaces/IUserRepository';

export class DeleteUserUseCase implements IUseCase<TDeleteUser, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute(userId: TDeleteUser) {
    await this.getUserByIdUseCase.execute(userId);

    await this.userRepository.delete(userId);
  }
}
