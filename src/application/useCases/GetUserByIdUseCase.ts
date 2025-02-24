import { prismaClient } from '../lib/prismaClient';

import { User } from '@prisma/client';

import { UserNotFound } from '../errors/UserNotFound';

import { IUseCase } from '../interfaces/IUseCase';

export class GetUserByIdUseCase implements IUseCase<string, User> {
  async execute(id: string): Promise<User> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
