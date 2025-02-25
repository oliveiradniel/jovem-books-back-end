import { User } from '@prisma/client';
import { IUserRepository } from './interfaces/IUserRepository';
import { prismaClient } from '../lib/prismaClient';

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

  async create(
    data: Omit<Omit<Omit<User, 'id'>, 'createdAt'>, 'updatedAt'>,
  ): Promise<string> {
    const { firstName, lastName } = await prismaClient.user.create({
      data,
      select: {
        firstName: true,
        lastName: true,
      },
    });

    return `${firstName} ${lastName}`;
  }

  async update(
    id: string,
    data: Omit<Partial<Omit<User, 'id'>>, 'createdAt'>,
  ): Promise<void> {
    await prismaClient.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.user.delete({ where: { id } });
  }
}
