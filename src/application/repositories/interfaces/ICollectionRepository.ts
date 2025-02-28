import { Collection } from '@prisma/client';

import { TOrderBy } from '../../../@types/TOrderBy';

export interface ICollectionRepository {
  list({
    userId,
    orderBy,
  }: {
    userId: string;
    orderBy: TOrderBy;
  }): Promise<Collection[] | null>;
  findById({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<Collection | null>;
  findByName({
    name,
    userId,
  }: {
    name: string;
    userId: string;
  }): Promise<Collection | null>;
  create(
    data: Omit<Omit<Omit<Partial<Collection>, 'id'>, 'createdAt'>, 'updatedAt'>,
  ): Promise<string>;
  update({
    id,
    data,
  }: {
    id: string;
    data: Omit<Partial<Omit<Collection, 'id'>>, 'createdAt'>;
  }): Promise<void>;
  delete({ id, userId }: { id: string; userId: string }): Promise<void>;
}
