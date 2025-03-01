import { Book } from '@prisma/client';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';

import { TOrderBy } from '../../../@types/TOrderBy';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

interface IInput {
  userId: string;
  orderBy: TOrderBy;
}

export class ListBooksUseCase implements IUseCase<IInput, Book[] | null> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId, orderBy }: IInput): Promise<Book[] | null> {
    await this.getUserByIdUseCase.execute(userId);

    const books = await this.bookRepository.list({
      userId,
      orderBy,
    });

    return books;
  }
}
