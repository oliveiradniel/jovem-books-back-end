import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
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
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId, bookId }: TDeleteBook): Promise<void> {
    await this.getUserByIdUseCase.execute({ userId });

    await this.getBookByIdUseCase.execute({
      bookId,
      userId,
    });

    await this.bookRepository.delete({ bookId, userId });
  }
}
