import { Book } from '@prisma/client';

import { UserNotFound } from '../../errors/user/UserNotFound';
import { BookNotFound } from '../../errors/book/BookNotFound';
import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { IBookRepository } from '../../repositories/interfaces/IBookRepository';

interface IInput {
  bookId: string;
  data: Omit<
    Book,
    | 'author'
    | 'sinopse'
    | 'numberOfPages'
    | 'type'
    | 'dateOfPublication'
    | 'id'
    | 'createdAt'
    | 'updatedAt'
  > &
    Partial<
      Pick<
        Book,
        'author' | 'sinopse' | 'numberOfPages' | 'type' | 'dateOfPublication'
      >
    >;
}

export class UpdateBookUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ bookId, data }: IInput): Promise<void> {
    const { userId } = data;

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

    const isTitleInUse = await this.bookRepository.findByTitle({
      userId,
      title: data.title,
    });

    if (isTitleInUse && isTitleInUse.id !== bookId) {
      throw new TitleAlreadyInUse();
    }

    await this.bookRepository.update({
      id: bookId,
      data,
    });
  }
}
