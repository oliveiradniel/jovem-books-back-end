import { prismaClient } from '../lib/prismaClient';

import { sign } from 'jsonwebtoken';

import { compare } from 'bcrypt';

import { env } from '../../config/env';

import { InvalidCredentials } from '../errors/InvalidCredentials';

interface IInput {
  username: string;
  password: string;
}

interface IOuput {
  accessToken: string;
}

export class SignInUseCase {
  async execute({ username, password }: IInput): Promise<IOuput> {
    const user = await prismaClient.user.findUnique({
      where: { username },
    });

    if (!user) throw new InvalidCredentials();
    console.log(password, user.password);

    const isPasswordMatch = await compare(password, user.password);

    if (!isPasswordMatch) throw new InvalidCredentials();

    const accessToken = sign({ sub: user.id }, env.JWT_SECRET, {
      expiresIn: '1d',
    });

    return { accessToken };
  }
}
