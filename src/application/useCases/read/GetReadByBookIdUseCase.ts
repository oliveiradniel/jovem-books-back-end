import { Read } from '@prisma/client';

import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { ReadingAlreadyStarted } from '../../errors/read/ReadingAlreadyStarted';

import { IUseCase } from '../../interfaces/IUseCase';

import { IReadRepository } from '../../repositories/interfaces/IReadRepository';
import { ReadingNotFound } from '../../errors/read/ReadingNotFound';

interface IInput {
  bookId: string;
  userId: string;
  shouldReturn?: boolean;
}

export class GetReadByIdUseCase implements IUseCase<IInput, Read | null> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({
    bookId,
    userId,
    shouldReturn = false,
  }: IInput): Promise<Read | null> {
    await this.getUserByIdUseCase.execute({ userId });

    await this.getBookByIdUseCase.execute({ bookId, userId });

    const read = await this.readRepository.findById({ bookId });

    if (shouldReturn && read) {
      throw new ReadingAlreadyStarted();
    }

    if (!read && !shouldReturn) {
      throw new ReadingNotFound();
    }

    return read;
  }
}
