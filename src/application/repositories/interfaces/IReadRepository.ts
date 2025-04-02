/* eslint-disable @typescript-eslint/no-empty-object-type */

import { IRead, IReadWithBook } from '../../../@types/IRead';

import { IRepository } from '../../interfaces/IRepository';

type ReadDataCreate = Omit<
  Partial<IRead>,
  'userId' | 'bookId' | 'createdAt' | 'updatedAt'
>;

type ReadDataUpdate = Omit<Partial<IRead>, 'bookId' | 'createdAt'>;

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
  extends IRepository<
    IRead | IReadWithBook,
    IFindReadById,
    ICreate,
    IDelete,
    IList,
    IUpdate
  > {}
