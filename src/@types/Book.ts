import { Book, Read } from '@prisma/client';

export type TBook = Book & { read: Read | null };
