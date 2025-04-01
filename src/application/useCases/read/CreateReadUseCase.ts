import { Read } from '@prisma/client';

import { GetReadByBookIdUseCase } from './GetReadByBookIdUseCase';
import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IReadRepository } from '../../repositories/interfaces/IReadRepository';

type DataToCreateRead = Omit<
  Partial<Read>,
  'bookId' | 'createdAt' | 'finishedAt'
>;

interface IInput {
  bookId: string;
  userId: string;
  data?: DataToCreateRead;
}

export class CreateReadUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getReadByIdUseCase: GetReadByBookIdUseCase,
    private readonly getBookByBookIdUseCase: GetBookByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ bookId, userId, data }: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute({ userId });

    await this.getBookByBookIdUseCase.execute({ bookId, userId });

    await this.getReadByIdUseCase.execute({
      bookId,
      userId,
      shouldReturn: true,
    });

    await this.readRepository.create({ bookId, data });
  }
}
