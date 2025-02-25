import { sign } from 'jsonwebtoken';

import { compare } from 'bcrypt';

import { env } from '../../config/env';

import { UserRepository } from '../repositories/UserRepository';

import { InvalidCredentials } from '../errors/InvalidCredentials';

import { IUseCase } from '../interfaces/IUseCase';

interface IInput {
  username: string;
  password: string;
}

interface IOuput {
  accessToken: string;
}

export class SignInUseCase implements IUseCase<IInput, IOuput> {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ username, password }: IInput): Promise<IOuput> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) throw new InvalidCredentials();

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) throw new InvalidCredentials();

    const accessToken = sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { accessToken };
  }
}
