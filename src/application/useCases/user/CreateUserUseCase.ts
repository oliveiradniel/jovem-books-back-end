import { User } from '@prisma/client';

import { hash } from 'bcrypt';

import { GetUserByUsernameUseCase } from './GetUserByUsernameUseCase';
import { GetUserByEmailUseCase } from './GetUserByEmailUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

type IInput = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

export class CreateUserUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  async execute(data: IInput) {
    await this.getUserByUsernameUseCase.execute({
      username: data.username,
    });

    await this.getUserByEmailUseCase.execute({ email: data.email });

    const hashedPassword = await hash(data.password, 10);

    const newUser = {
      ...data,
      password: hashedPassword,
    };

    await this.userRepository.create(newUser);
  }
}
