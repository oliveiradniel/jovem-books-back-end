import { User } from '@prisma/client';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<boolean>;
  create(
    data: Omit<Omit<Partial<Omit<User, 'id'>>, 'createdAt'>, 'updatedAt'>,
  ): Promise<any>;
  update(
    id: string,
    data: Omit<Partial<Omit<User, 'id'>>, 'createdAt'>,
  ): Promise<void>;
  delete(id: string): Promise<void>;
}
