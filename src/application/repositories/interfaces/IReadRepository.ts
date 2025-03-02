import { Read } from '@prisma/client';

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
  userId: string;
}

export interface ICreate {
  bookId: string;
  userId: string;
  data: ReadDataCreate;
}

export interface IUpdate {
  bookId: string;
  userId: string;
  data: ReadDataUpdate;
}

export interface IDelete {
  bookId: string;
  userId: string;
}
