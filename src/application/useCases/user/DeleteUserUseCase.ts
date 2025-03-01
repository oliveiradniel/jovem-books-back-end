import { GetUserByIdUseCase } from './GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

export class DeleteUserUseCase implements IUseCase<string, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute(id: string) {
    await this.getUserByIdUseCase.execute(id);

    await this.userRepository.delete(id);
  }
}
