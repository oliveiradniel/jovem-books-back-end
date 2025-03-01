import { Book } from '@prisma/client';

import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookRepository } from '../../repositories/interfaces/IBookRepository';

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
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ data }: IInput): Promise<void> {
    await this.getUserByIdUseCase.execute(data.userId);

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
