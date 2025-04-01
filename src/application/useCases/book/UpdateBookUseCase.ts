import { IBook } from '../../../@types/IBook';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetBookByIdUseCase } from './GetBookByIdUseCase';
import { GetBookByTitleUseCase } from './GetBookByTitleUseCase';

import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';

interface IInput {
  bookId: string;
  userId: string;
  data: Omit<
    IBook,
    | 'authors'
    | 'sinopse'
    | 'numberOfPages'
    | 'genreLiterary'
    | 'createdAt'
    | 'id'
    | 'userId'
    | 'read'
  > &
    Partial<
      Pick<
        IBook,
        | 'authors'
        | 'sinopse'
        | 'numberOfPages'
        | 'genreLiterary'
        | 'imagePath'
        | 'title'
      >
    >;
}

export class UpdateBookUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getBookByTitleUseCase: GetBookByTitleUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ bookId, userId, data }: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute({ userId });

    await this.getBookByIdUseCase.execute({
      bookId,
      userId,
    });

    const bookDataWithTheTitleInUse = await this.getBookByTitleUseCase.execute({
      userId,
      title: data.title,
      shouldReturn: true,
    });

    if (bookDataWithTheTitleInUse && bookDataWithTheTitleInUse.id !== bookId) {
      throw new TitleAlreadyInUse();
    }

    if (!this.bookRepository?.update) {
      return;
    }

    await this.bookRepository.update({
      bookId,
      userId,
      data,
    });
  }
}
