import { ReadingStatus } from '@prisma/client';

export interface IBook {
  id: string;
  title: string;
  authors: string[];
  sinopse: string | null;
  imagePath: string | null;
  numberOfPages: number;
  literaryGenre: string[];
  read: {
    status: ReadingStatus;
    currentPage: number;
    createdAt: Date;
    finishedAt: Date | null;
  } | null;
}
