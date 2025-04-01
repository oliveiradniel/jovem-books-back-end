/* eslint-disable @typescript-eslint/no-empty-object-type */

import { IRead } from '../../../@types/IRead';

import { Read } from '@prisma/client';

import { IRepository } from '../../interfaces/IRepository';

type ReadDataCreate = Omit<
  Partial<Read>,
  'userId' | 'bookId' | 'createdAt' | 'updatedAt'
>;

type ReadDataUpdate = Omit<Partial<Read>, 'bookId' | 'createdAt'>;

export interface IList {
  userId: string;
}

export interface IFindReadById {
  bookId: string;
}

export interface ICreate {
  bookId: string;

  data?: ReadDataCreate;
}

export interface IUpdate {
  bookId: string;

  data: ReadDataUpdate;
}

export interface IDelete {
  bookId: string;
}

export interface IReadRepository
  extends IRepository<IRead, IFindReadById, ICreate, IDelete, IList, IUpdate> {}
