import { TBook } from '../../../@types/Book';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { BookNotFound } from '../../errors/book/BookNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IBookRepository,
  TGetBookById,
} from '../../repositories/interfaces/IBookRepository';

export class GetBookByIdUseCase implements IUseCase<TGetBookById, TBook> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId, bookId }: TGetBookById): Promise<TBook> {
    await this.getUserByIdUseCase.execute(userId);

    const book = await this.bookRepository.findById({
      bookId,
      userId,
    });

    if (!book) {
      throw new BookNotFound();
    }

    return book;
  }
}
