import { ReadingStatus } from '@prisma/client';

export interface IRead {
  createdAt: Date;
  bookId: string;
  currentPage: number;
  status: ReadingStatus;
  notes: string | null;
  finishedAt: Date | null;
}

export interface IReadWithBook {
  title: string;
  read: {
    createdAt: Date;
    bookId: string;
    currentPage: number;
    status: ReadingStatus;
    notes: string | null;
    finishedAt: Date | null;
  } | null;
}
