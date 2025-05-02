import { z } from 'zod';

import { User } from '@prisma/client';

import { IRepository } from '../../interfaces/IRepository';

import {
  CreateUserSchema,
  DeleteUserSchema,
  GetUserByEmailSchema,
  GetUserByIdSchema,
  SignInSchema,
  UpdateUserSchema,
  GetUserByUsernameSchema,
  UsernameSchema,
  EmailSchema,
} from '../../schemas/user';

export type TSignIn = z.infer<typeof SignInSchema>;

export type TGetUserById = z.infer<typeof GetUserByIdSchema>;

export type TGetUserByUsername = z.infer<typeof GetUserByUsernameSchema>;

export type TGetUserByEmail = z.infer<typeof GetUserByEmailSchema>;

export type TUsername = z.infer<typeof UsernameSchema>;

export type TEmail = z.infer<typeof EmailSchema>;

export type TCreateUser = z.infer<typeof CreateUserSchema>;

export type TUpdateUser = z.infer<typeof UpdateUserSchema>;

export type TDeleteUser = z.infer<typeof DeleteUserSchema>;

export interface IUserRepository
  extends IRepository<
    User,
    TGetUserById,
    TCreateUser,
    TDeleteUser,
    TUpdateUser
  > {
  findByUsername(username: TUsername): Promise<User | null>;
  findByEmail(email: TEmail): Promise<User | null>;
}
