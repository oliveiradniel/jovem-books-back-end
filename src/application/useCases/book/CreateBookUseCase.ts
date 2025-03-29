import { Book } from '@prisma/client';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetBookByTitleUseCase } from './GetBookByTitleUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';

type DataToCreateBook = Omit<
  Book,
  | 'id'
  | 'userId'
  | 'author'
  | 'sinopse'
  | 'numberOfPages'
  | 'type'
  | 'dateOfPublication'
  | 'createdAt'
  | 'updatedAt'
> &
  Partial<
    Pick<Book, 'authors' | 'sinopse' | 'numberOfPages' | 'dateOfPublication'>
  > &
  Pick<Book, 'genreLiterary'>;

interface IInput {
  userId: string;
  data: DataToCreateBook;
}

export class CreateBookUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getBookByTitleUseCase: GetBookByTitleUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ userId, data }: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute({ userId });

    await this.getBookByTitleUseCase.execute({
      userId,
      title: data.title,
    });

    await this.bookRepository.create({ userId, data });
  }
}
