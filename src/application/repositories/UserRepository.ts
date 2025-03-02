import { prismaClient } from '../lib/prismaClient';

import { User } from '@prisma/client';

import {
  IDelete,
  IFindUserByEmail,
  IFindUserById,
  IFindUserByUsername,
  IUpdate,
  IUserRepository,
  UserDataCreate,
} from './interfaces/IUserRepository';

export class UserRepository implements IUserRepository {
  async findById({ userId }: IFindUserById): Promise<User | null> {
    const user = await prismaClient.user.findUnique({ where: { id: userId } });

    return user;
  }

  async findByUsername({
    username,
  }: IFindUserByUsername): Promise<User | null> {
    return await prismaClient.user.findUnique({ where: { username } });
  }

  async findByEmail({ email }: IFindUserByEmail): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: { email },
    });
  }

  async create(data: UserDataCreate): Promise<void> {
    await prismaClient.user.create({
      data,
    });
  }

  async update({ userId, data }: IUpdate): Promise<void> {
    await prismaClient.user.update({
      where: { id: userId },
      data,
    });
  }

  async delete({ userId }: IDelete): Promise<void> {
    await prismaClient.user.delete({ where: { id: userId } });
  }
}
