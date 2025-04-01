import { ReadingStatus } from '@prisma/client';

export interface IRead {
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
