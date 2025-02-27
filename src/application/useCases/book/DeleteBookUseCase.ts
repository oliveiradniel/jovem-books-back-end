import { BookNotFound } from '../../errors/book/BookNotFound';
import { UserNotFound } from '../../errors/user/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository copy';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
  bookId: string;
  userId: string;
}

export class DeleteBookUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ bookId, userId }: IInput): Promise<void> {
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

    await this.bookRepository.delete({ id: bookId, userId });
  }
}
