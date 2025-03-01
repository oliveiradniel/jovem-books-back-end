import { Book } from '@prisma/client';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetBookByIdUseCase } from './GetBookByIdUseCase';
import { GetBookByTitleUseCase } from './GetBookByTitleUseCase';

import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';

interface IInput {
  bookId: string;
  data: Omit<
    Book,
    | 'author'
    | 'sinopse'
    | 'numberOfPages'
    | 'type'
    | 'dateOfPublication'
    | 'createdAt'
    | 'updatedAt'
    | 'id'
  > &
    Partial<
      Pick<
        Book,
        'author' | 'sinopse' | 'numberOfPages' | 'type' | 'dateOfPublication'
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

  async execute({ bookId, data }: IInput): Promise<void> {
    const { userId } = data;

    await this.getUserByIdUseCase.execute(userId);

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

    await this.bookRepository.update({
      id: bookId,
      data,
    });
  }
}
