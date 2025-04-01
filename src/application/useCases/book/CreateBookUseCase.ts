import { IBook } from '../../../@types/IBook';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetBookByTitleUseCase } from './GetBookByTitleUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';

type DataToCreateBook = Omit<
  IBook,
  | 'id'
  | 'userId'
  | 'authors'
  | 'sinopse'
  | 'numberOfPages'
  | 'type'
  | 'createdAt'
  | 'read'
> &
  Partial<Pick<IBook, 'authors' | 'sinopse'>> &
  Pick<IBook, 'genreLiterary' | 'numberOfPages'>;

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
