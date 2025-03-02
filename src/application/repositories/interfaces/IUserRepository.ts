import { User } from '@prisma/client';
import { IRepository } from '../../interfaces/IRepository';

export type UserDataCreate = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;

type UserDataUpdate = Omit<Partial<User>, 'id' | 'createdAt'>;

export interface IFindUserById {
  userId: string;
}

export interface IUpdate {
  userId: string;
  data: UserDataUpdate;
}

export interface IDelete {
  userId: string;
}

export interface IFindUserByUsername {
  username: string;
}

export interface IFindUserByEmail {
  email: string;
}

export interface IUserRepository
  extends IRepository<User, IFindUserById, UserDataCreate, IDelete, IUpdate> {
  findByUsername(data: IFindUserByUsername): Promise<User | null>;
  findByEmail(data: IFindUserByEmail): Promise<User | null>;
}
