import { prismaClient } from '../lib/prismaClient';

import { User } from '@prisma/client';

import { UserNotFound } from '../errors/UserNotFound';

interface IInput {
  id: string;
}

export class GetUserByIdUseCase {
  async execute({ id }: IInput): Promise<User> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
