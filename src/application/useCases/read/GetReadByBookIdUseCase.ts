import { IRead } from '../../../@types/IRead';

import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';

// import { ReadingAlreadyStarted } from '../../errors/read/ReadingAlreadyStarted';
// import { ReadingNotFound } from '../../errors/read/ReadingNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IReadRepository,
  TGetReadByBookId,
} from '../../repositories/interfaces/IReadRepository';

export class GetReadByBookIdUseCase
  implements IUseCase<TGetReadByBookId, IRead | null>
{
  constructor(
    private readonly readRepository: IReadRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
  ) {}

  async execute({ bookId, userId }: TGetReadByBookId): Promise<IRead | null> {
    await this.getBookByIdUseCase.execute({ userId, bookId });

    const read = await this.readRepository.findById({ bookId });

    // if (shouldReturn && read) {
    //   throw new ReadingAlreadyStarted();
    // }

    // if (!read && !shouldReturn) {
    //   throw new ReadingNotFound();
    // }

    return read;
  }
}
