import { User } from '@prisma/client';

import { prismaClient } from '../lib/prismaClient';

import { GetUserByIdUseCase } from './GetUserByIdUseCase';

import { EmailAlreadyInUse } from '../errors/EmailAlreadyInUse';
import { UsernameAlreadyInUse } from '../errors/UsernameAlreadyInUse';

interface IInput {
  user: Omit<Omit<Partial<Omit<User, 'id'>>, 'createdAt'>, 'updatedAt'>;
}

export class EditUserUseCase {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async execute(id: string, { user }: IInput) {
    if (
      !Object.values(user).some(value => value !== null && value !== undefined)
    ) {
      return;
    }
    const userExists = await this.getUserByIdUseCase.execute({ id });

    if (user.email) {
      const IsTheEmailInUse = await prismaClient.user.findUnique({
        where: { email: user.email },
      });

      if (IsTheEmailInUse && userExists.email !== user.email)
        throw new EmailAlreadyInUse();
    }

    if (user.username) {
      const isTheUserNameInUse = await prismaClient.user.findUnique({
        where: { username: user.username },
      });

      if (isTheUserNameInUse && userExists.username !== user.username)
        throw new UsernameAlreadyInUse();
    }

    await prismaClient.user.update({
      where: {
        id: id,
      },
      data: {
        ...user,
        updatedAt: new Date(),
      },
    });
  }
}
