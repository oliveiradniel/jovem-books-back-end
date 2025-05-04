import { Prisma, User } from '@prisma/client';

export type TUser =
  | User
  | (Prisma.UserGetPayload<{
      include: {
        books: {
          include: {
            read: true;
          };
        };
        _count: {
          select: { books: true };
        };
      };
    }> & {
      booksReading: number;
    });
