import { TBook } from '../../../@types/Book';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IBookRepository,
  TGetBookByTitle,
} from '../../repositories/interfaces/IBookRepository';

export class GetBookByTitleUseCase
  implements IUseCase<TGetBookByTitle, TBook | null>
{
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({
    title,
    userId,
    shouldReturn = false,
  }: TGetBookByTitle): Promise<TBook | null> {
    await this.getUserByIdUseCase.execute(userId);

    const book = await this.bookRepository.findByTitle({
      title,
      userId,
      shouldReturn,
    });

    if (shouldReturn && book) {
      return book;
    }

    if (book) {
      throw new TitleAlreadyInUse();
    }

    return null;
  }
}
