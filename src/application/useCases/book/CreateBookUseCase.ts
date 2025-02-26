import { TypeBook } from '@prisma/client';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository copy';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { UserNotFound } from '../../errors/user/UserNotFound';

interface IInput {
  userId: string;
  title: string;
  author: string | null;
  sinopse: string | null;
  numberOfPages: number | null;
  type: TypeBook;
  dateOfPublication: Date | null;
}

export class CreateBookUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ userId, ...data }: IInput): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    const bookData = {
      userId,
      ...data,
    };

    await this.bookRepository.create(bookData);
  }
}
