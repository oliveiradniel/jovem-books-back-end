import { prismaClient } from '../lib/prismaClient';

import { User } from '@prisma/client';

import { IUserRepository } from './interfaces/IUserRepository';

type UserDataCreate = Omit<Omit<Omit<User, 'id'>, 'createdAt'>, 'updatedAt'>;

type UserDataUpdate = Omit<Partial<Omit<User, 'id'>>, 'createdAt'>;

interface IUpdate {
  id: string;
  data: UserDataUpdate;
}

export class UserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const user = await prismaClient.user.findUnique({ where: { id } });

    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    return await prismaClient.user.findUnique({ where: { username } });
  }

  async findByEmail(email: string): Promise<boolean> {
    return (
      (await prismaClient.user.count({
        where: { email },
      })) > 0
    );
  }

  async create(data: UserDataCreate): Promise<string> {
    const { firstName, lastName } = await prismaClient.user.create({
      data,
      select: {
        firstName: true,
        lastName: true,
      },
    });

    return `${firstName} ${lastName}`;
  }

  async update({ id, data }: IUpdate): Promise<void> {
    await prismaClient.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.user.delete({ where: { id } });
  }
}
