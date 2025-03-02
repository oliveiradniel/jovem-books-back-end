import { Read } from '@prisma/client';

export interface IReadRepository {
  list({ userId }: { userId: string }): Promise<Read[] | null>;

  findById({
    id,
    userId,
  }: {
    id: string;
    userId: string;
  }): Promise<Read | null>;

  create(
    data: Omit<Omit<Omit<Partial<Read>, 'id'>, 'createdAt'>, 'updatedAt'>,
  ): Promise<void>;
  update(
    data: Partial<Omit<Read, 'id' | 'createdAt' | 'userId'>> & {
      id: string;
      userId: string;
    },
  ): Promise<void>;
  delete({ id, userId }: { id: string; userId: string }): Promise<void>;
}
