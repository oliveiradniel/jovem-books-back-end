import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetBookByTitleUseCase } from './GetBookByTitleUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  BookDataCreate,
  IBookRepository,
} from '../../repositories/interfaces/IBookRepository';

interface IInput {
  userId: string;
  data: BookDataCreate;
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
