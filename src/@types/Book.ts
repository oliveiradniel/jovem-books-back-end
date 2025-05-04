import { Book, Read } from '@prisma/client';

export type TBook = Book & { read: Read | null };

export interface IBookWithTotalItems {
  totalItems: number;
  data: Book[];
}
