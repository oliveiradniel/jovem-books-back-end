import { IBook } from '../../../@types/IBook';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IBookRepository,
  TListBooks,
} from '../../repositories/interfaces/IBookRepository';

export class ListBooksUseCase implements IUseCase<TListBooks, IBook[]> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId, orderBy }: TListBooks): Promise<IBook[]> {
    await this.getUserByIdUseCase.execute({ userId });

    if (!this.bookRepository?.list) {
      return [];
    }

    const books = await this.bookRepository.list({
      userId,
      orderBy,
    });

    return books;
  }
}
