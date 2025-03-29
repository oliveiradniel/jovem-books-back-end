import { Read } from '@prisma/client';

import { GetReadByIdUseCase } from './GetReadByBookIdUseCase';
import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IReadRepository } from '../../repositories/interfaces/IReadRepository';

type DataToCreateRead = Omit<
  Partial<Read>,
  'bookId' | 'createdAt' | 'finishedAt' | 'status'
> &
  Pick<Read, 'status'>;

interface IInput {
  bookId: string;
  userId: string;
  data?: DataToCreateRead;
}

export class CreateReadUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getReadByIdUseCase: GetReadByIdUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ bookId, userId, data }: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute({ userId });

    await this.getBookByIdUseCase.execute({ bookId, userId });

    await this.getReadByIdUseCase.execute({
      bookId,
      userId,
      shouldReturn: true,
    });

    await this.readRepository.create({ bookId, userId, data });
  }
}
