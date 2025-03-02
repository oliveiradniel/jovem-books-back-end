import { Read } from '@prisma/client';

import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IReadRepository } from '../../repositories/interfaces/IReadRepository';

type DataToUpdateRead = Omit<
  Partial<Read>,
  'bookId' | 'userId' | 'createdAt' | 'updatedAt'
>;

interface IInput {
  bookId: string;
  userId: string;
  data: DataToUpdateRead;
}

export class UpdateReadUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ bookId, userId, data }: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute({ userId });

    await this.getBookByIdUseCase.execute({ userId, bookId });

    if (!this.readRepository?.update) {
      return;
    }

    await this.readRepository.update({ bookId, userId, data });
  }
}
