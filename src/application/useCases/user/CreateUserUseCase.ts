import { hash } from 'bcrypt';

import { GetUserByUsernameUseCase } from './GetUserByUsernameUseCase';
import { GetUserByEmailUseCase } from './GetUserByEmailUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IUserRepository,
  TCreateUser,
} from '../../repositories/interfaces/IUserRepository';

export class CreateUserUseCase implements IUseCase<TCreateUser, void> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly getUserByUsernameUseCase: GetUserByUsernameUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
  ) {}

  async execute(data: TCreateUser) {
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
