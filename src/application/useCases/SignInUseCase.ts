import { sign } from 'jsonwebtoken';

import { compare } from 'bcrypt';

import { env } from '../../config/env';

import { InvalidCredentials } from '../errors/user/InvalidCredentials';

import { IUseCase } from '../interfaces/IUseCase';
import { IUserRepository } from '../repositories/interfaces/IUserRepository';

interface IInput {
  username: string;
  password: string;
}

interface IOuput {
  accessToken: string;
}

export class SignInUseCase implements IUseCase<IInput, IOuput> {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ username, password }: IInput): Promise<IOuput> {
    const user = await this.userRepository.findByUsername({ username });

    if (!user) throw new InvalidCredentials();

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) throw new InvalidCredentials();

    const accessToken = sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { accessToken };
  }
}
