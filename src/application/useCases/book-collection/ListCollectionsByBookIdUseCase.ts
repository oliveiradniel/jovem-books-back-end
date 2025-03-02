import { Collection } from '@prisma/client';

import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';
import { GetCollectionByIdUseCase } from '../collection/GetCollectionByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookCollectionRepository } from '../../repositories/interfaces/IBookCollectionRepository';

interface IInput {
  collectionId: string;
  bookId: string;
  userId: string;
}

export class ListCollectionsByBookIdUseCase
  implements IUseCase<IInput, Collection[]>
{
  constructor(
    private readonly bookCollectionRepository: IBookCollectionRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getCollectionByIdUseCase: GetCollectionByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({
    collectionId,
    bookId,
    userId,
  }: IInput): Promise<Collection[]> {
    await this.getCollectionByIdUseCase.execute({ collectionId, userId });

    await this.getBookByIdUseCase.execute({ bookId, userId });

    await this.getUserByIdUseCase.execute(userId);

    const collections =
      await this.bookCollectionRepository.listCollectionsByBookId({
        bookId,
        userId,
      });

    return collections;
  }
}
