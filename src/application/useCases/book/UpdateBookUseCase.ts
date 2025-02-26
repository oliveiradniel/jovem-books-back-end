import { Book } from '@prisma/client';

import { UserNotFound } from '../../errors/user/UserNotFound';
import { BookNotFound } from '../../errors/book/BookNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { IBookRepository } from '../../repositories/interfaces/IBookRepository copy';

interface IInput {
  bookId: string;
  userId: string;
  data: Omit<Omit<Partial<Book>, 'id'>, 'createdAt'>;
}

export class UpdateBookUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ bookId, userId, data }: IInput): Promise<void> {
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

    await this.bookRepository.update({
      id: bookId,
      userId,
      data,
    });
  }
}
