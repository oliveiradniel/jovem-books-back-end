import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetBookByTitleUseCase } from './GetBookByTitleUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  TCreateBook,
  IBookRepository,
} from '../../repositories/interfaces/IBookRepository';

export class CreateBookUseCase implements IUseCase<TCreateBook, void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getBookByTitleUseCase: GetBookByTitleUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute(data: TCreateBook): Promise<void> {
    const userId = data.userId;

    await this.getUserByIdUseCase.execute({ userId });

    await this.getBookByTitleUseCase.execute({
      userId,
      title: data.title,
    });

    await this.bookRepository.create(data);
  }
}
