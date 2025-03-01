import { User } from '@prisma/client';

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByUsername(username: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(
    data: Omit<Omit<Omit<User, 'id'>, 'createdAt'>, 'updatedAt'>,
  ): Promise<any>;
  update({
    id,
    data,
  }: {
    id: string;
    data: Omit<Partial<Omit<User, 'id'>>, 'createdAt'>;
  }): Promise<void>;
  delete(id: string): Promise<void>;
}
