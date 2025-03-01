import { Book } from '@prisma/client';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';
import { GetBookByTitleUseCase } from './GetBookByTitleUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';

type IInput = Omit<
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

export class CreateBookUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getBookByTitleUseCase: GetBookByTitleUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute(data: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute(data.userId);

    await this.getBookByTitleUseCase.execute({
      userId: data.userId,
      title: data.title,
    });

    await this.bookRepository.create(data);
  }
}
