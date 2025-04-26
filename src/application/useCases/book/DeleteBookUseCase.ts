import { GetBookByIdUseCase } from './GetBookByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IBookRepository,
  TDeleteBook,
} from '../../repositories/interfaces/IBookRepository';

export class DeleteBookUseCase implements IUseCase<TDeleteBook, void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
  ) {}

  async execute({ userId, bookId }: TDeleteBook): Promise<void> {
    await this.getBookByIdUseCase.execute({
      bookId,
      userId,
    });

    await this.bookRepository.delete({ bookId, userId });
  }
}
