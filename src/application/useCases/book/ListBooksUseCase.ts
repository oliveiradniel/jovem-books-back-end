import { Book } from '@prisma/client';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';

import { TOrderBy } from '../../../@types/TOrderBy';

interface IInput {
  userId: string;
  orderBy?: TOrderBy;
}

export class ListBooksUseCase implements IUseCase<IInput, Book[] | void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId, orderBy = 'asc' }: IInput): Promise<Book[] | void> {
    await this.getUserByIdUseCase.execute({ userId });

    if (!this.bookRepository?.list) {
      return;
    }

    const books = await this.bookRepository.list({
      userId,
      orderBy,
    });

    return books;
  }
}
