import { prismaClient } from '../lib/prismaClient';

import { TUser } from '../../@types/User';

import {
  TDeleteUser,
  TGetUserById,
  TUpdateUser,
  IUserRepository,
  TCreateUser,
  TEmail,
  TUsername,
} from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  async findById(userId: TGetUserById): Promise<TUser | null> {
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      include: {
        _count: { select: { books: true } },
      },
    });

    if (!user) return null;

    const booksReading = await prismaClient.book.count({
      where: {
        userId,
        read: {
          is: { status: 'READING' },
        },
      },
    });

    return { ...user, booksReading };
  }

  async findByUsername(username: TUsername): Promise<TUser | null> {
    return await prismaClient.user.findUnique({ where: { username } });
  }

  async findByEmail(email: TEmail): Promise<TUser | null> {
    return await prismaClient.user.findUnique({
      where: { email },
    });
  }

  async create(data: TCreateUser): Promise<TUser> {
    return await prismaClient.user.create({
      data,
    });
  }

  async update({ userId, ...data }: TUpdateUser): Promise<TUser> {
    return await prismaClient.user.update({
      where: { id: userId },
      data,
    });
  }

  async delete(userId: TDeleteUser): Promise<void> {
    await prismaClient.user.delete({ where: { id: userId } });
  }
}
