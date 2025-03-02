import { Collection } from '@prisma/client';

import { TOrderBy } from '../../../@types/TOrderBy';

import { IRepository } from '../../interfaces/IRepository';

type CollectionDataUpdate = Omit<
  Partial<Collection>,
  'id' | 'userId' | 'createdAt'
>;

export interface IList {
  userId: string;
  orderBy: TOrderBy;
}

export interface IFindCollectionById {
  collectionId: string;
  userId: string;
}

export interface ICreate {
  userId: string;
  name: string;
}

export interface IUpdate {
  collectionId: string;
  userId: string;
  data: CollectionDataUpdate;
}

export interface IDelete {
  collectionId: string;
  userId: string;
}

export interface IFindCollectionByName {
  name: string;
  userId: string;
}

export interface ICollectionRepository
  extends IRepository<
    Collection,
    IFindCollectionById,
    ICreate,
    IDelete,
    IList,
    IUpdate
  > {
  findByName({
    name,
    userId,
  }: IFindCollectionByName): Promise<Collection | null>;
}
