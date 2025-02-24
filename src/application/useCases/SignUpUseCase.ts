import { prismaClient } from '../lib/prismaClient';

import { hash } from 'bcrypt';

import { UsernameAlreadyInUse } from '../errors/UsernameAlreadyInUse';
import { EmailAlreadyInUse } from '../errors/EmailAlreadyInUse';

import { IUseCase } from '../interfaces/IUseCase';

interface IInput {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export class SignUpUseCase implements IUseCase<IInput, void> {
  async execute({ username, firstName, lastName, email, password }: IInput) {
    console.log(username);
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
