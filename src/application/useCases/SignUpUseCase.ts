import { prismaClient } from '../lib/prismaClient';

import { hash } from 'bcrypt';

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

    if (accountWithEmailAlreadyExists) throw new Error();

    const accountWithUsernameAlreadyExists = await prismaClient.user.findUnique(
      {
        where: { username },
      },
    );

    if (accountWithUsernameAlreadyExists) throw new Error();

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
