import { Collection } from '@prisma/client';

import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookCollectionRepository } from '../../repositories/interfaces/IBookCollectionRepository';

interface IInput {
  bookId: string;
  userId: string;
}

export class ListCollectionsByBookIdUseCase
  implements IUseCase<IInput, Collection[] | null>
{
  constructor(
    private readonly bookCollectionRepository: IBookCollectionRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ bookId, userId }: IInput): Promise<Collection[] | null> {
    await this.getBookByIdUseCase.execute({ bookId, userId });

    await this.getUserByIdUseCase.execute({ userId });

    const collections =
      await this.bookCollectionRepository.listCollectionsByBookId({
        bookId,
        userId,
      });

    return collections;
  }
}
