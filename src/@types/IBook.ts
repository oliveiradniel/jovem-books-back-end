import { GenreLiterary, ReadingStatus } from '@prisma/client';

export interface IBook {
  id: string;
  title: string;
  authors: string[];
  sinopse: string | null;
  imagePath: string | null;
  numberOfPages: number;
  genreLiterary: GenreLiterary[];
  read: {
    status: ReadingStatus;
    currentPage: number;
    createdAt: Date;
    finishedAt: Date | null;
  } | null;
}
