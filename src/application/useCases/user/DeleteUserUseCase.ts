import { UserNotFound } from '../../errors/user/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

export class DeleteUserUseCase implements IUseCase<string, void> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    await this.userRepository.delete(id);
  }
}
