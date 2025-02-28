import { Book } from '@prisma/client';

import { UserNotFound } from '../../errors/user/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

import { TOrderBy } from '../../../@types/TOrderBy';

interface IInput {
  userId: string;
  orderBy: TOrderBy;
}

export class ListBooksUseCase implements IUseCase<IInput, Book[] | null> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ userId, orderBy }: IInput): Promise<Book[] | null> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const books = await this.bookRepository.list({
      userId,
      orderBy,
    });

    return books;
  }
}
