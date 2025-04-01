import { IRead } from '../../../@types/IRead';

import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { ReadingAlreadyStarted } from '../../errors/read/ReadingAlreadyStarted';
import { ReadingNotFound } from '../../errors/read/ReadingNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { IReadRepository } from '../../repositories/interfaces/IReadRepository';

interface IInput {
  bookId: string;
  userId: string;
  shouldReturn?: boolean;
}

export class GetReadByBookIdUseCase implements IUseCase<IInput, IRead | null> {
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({
    bookId,
    userId,
    shouldReturn = false,
  }: IInput): Promise<IRead | null> {
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
