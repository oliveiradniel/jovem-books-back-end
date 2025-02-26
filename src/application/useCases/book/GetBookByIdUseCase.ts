import { Book } from '@prisma/client';

import { UserNotFound } from '../../errors/user/UserNotFound';
import { BookNotFound } from '../../errors/book/BookNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository copy';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  bookId: string;
  userId: string;
}

interface IOutput {
  book: Book | null;
}

export class GetBookByIdUseCase implements IUseCase<IInput, IOutput> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ bookId, userId }: IInput): Promise<IOutput> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const book = await this.bookRepository.findById({
      id: bookId,
      userId,
    });

    if (!book) {
      throw new BookNotFound();
    }

    return { book };
  }
}
