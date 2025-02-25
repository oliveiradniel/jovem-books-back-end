import { UserRepository } from '../../repositories/UserRepository';

import { UserNotFound } from '../../errors/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

export class DeleteUserUseCase implements IUseCase<string, void> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    await this.userRepository.delete(id);
  }
}
