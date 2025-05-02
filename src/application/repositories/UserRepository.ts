import { prismaClient } from '../lib/prismaClient';

import { IUser } from '../../@types/IUser';

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
  async findById(userId: TGetUserById): Promise<IUser | null> {
    const user = await prismaClient.user.findUnique({ where: { id: userId } });

    return user;
  }

  async findByUsername(username: TUsername): Promise<IUser | null> {
    return await prismaClient.user.findUnique({ where: { username } });
  }

  async findByEmail(email: TEmail): Promise<IUser | null> {
    return await prismaClient.user.findUnique({
      where: { email },
    });
  }

  async create(data: TCreateUser): Promise<IUser> {
    return await prismaClient.user.create({
      data,
    });
  }

  async update({ userId, ...data }: TUpdateUser): Promise<IUser> {
    return await prismaClient.user.update({
      where: { id: userId },
      data,
    });
  }

  async delete(userId: TDeleteUser): Promise<void> {
    await prismaClient.user.delete({ where: { id: userId } });
  }
}
