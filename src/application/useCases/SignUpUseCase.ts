import { prismaClient } from '../lib/prismaClient';

import { hash } from 'bcrypt';

import { UsernameAlreadyInUse } from '../errors/UsernameAlreadyInUse';
import { EmailAlreadyInUse } from '../errors/EmailAlreadyInUse';

interface IInput {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class SignUpUseCase {
  async execute({ username, firstName, lastName, email, password }: IInput) {
    const isTheEmailInUse = await prismaClient.user.findUnique({
      where: { email },
    });

    if (isTheEmailInUse) throw new EmailAlreadyInUse();

    const isTheUserNameInUse = await prismaClient.user.findUnique({
      where: { username },
    });

    if (isTheUserNameInUse) throw new UsernameAlreadyInUse();

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
