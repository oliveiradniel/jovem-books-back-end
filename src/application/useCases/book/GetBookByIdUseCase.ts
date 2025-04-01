import { IBook } from '../../../@types/IBook';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { BookNotFound } from '../../errors/book/BookNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';

interface IInput {
  bookId: string;
  userId: string;
}

export class GetBookByIdUseCase implements IUseCase<IInput, IBook> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ bookId, userId }: IInput): Promise<IBook> {
    await this.getUserByIdUseCase.execute({ userId });

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
