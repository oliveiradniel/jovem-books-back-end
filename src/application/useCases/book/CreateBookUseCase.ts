import { Book } from '@prisma/client';

import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';
import { UserNotFound } from '../../errors/user/UserNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';

interface IInput {
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

export class CreateBookUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly userRepository: IUserRepository,
  ) {}

  async execute({ data }: IInput): Promise<void> {
    const user = await this.userRepository.findById(data.userId);

    if (!user) {
      throw new UserNotFound();
    }

    const isTitleInUse = await this.bookRepository.findByTitle({
      userId: data.userId,
      title: data.title,
    });

    if (isTitleInUse) {
      throw new TitleAlreadyInUse();
    }

    await this.bookRepository.create(data);
  }
}
