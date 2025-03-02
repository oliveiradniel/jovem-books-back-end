import { GetUserByIdUseCase } from './GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  userId: string;
}

export class DeleteUserUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId }: IInput) {
    await this.getUserByIdUseCase.execute({ userId });

    await this.userRepository.delete({ userId });
  }
}
