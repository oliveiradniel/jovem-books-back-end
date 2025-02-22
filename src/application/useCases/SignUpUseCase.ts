import { prismaClient } from '../lib/prismaClient';

import { hash } from 'bcrypt';

import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';

interface IInput {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class SignUpUseCase {
  async execute({ username, firstName, lastName, email, password }: IInput) {
    const accountWithEmailAlreadyExists = await prismaClient.user.findUnique({
      where: { email },
    });

    if (accountWithEmailAlreadyExists) throw new AccountAlreadyExists();

    const accountWithUsernameAlreadyExists = await prismaClient.user.findUnique(
      {
        where: { username },
      },
    );

    if (accountWithUsernameAlreadyExists) throw new AccountAlreadyExists();

    const hashedPassword = await hash(password, 10);

    await prismaClient.user.create({
      data: {
        username,
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });
  }
}
