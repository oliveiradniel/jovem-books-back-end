import { IBook } from '../../../@types/IBook';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';

interface IInput {
  title: string;
  userId: string;
  shouldReturn?: boolean;
}

export class GetBookByTitleUseCase implements IUseCase<IInput, IBook | void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({
    title,
    userId,
    shouldReturn = false,
  }: IInput): Promise<IBook | void> {
    await this.getUserByIdUseCase.execute({ userId });

    const book = await this.bookRepository.findByTitle({ title, userId });

    if (shouldReturn && book) {
      return book;
    }

    if (book) {
      throw new TitleAlreadyInUse();
    }
  }
}
