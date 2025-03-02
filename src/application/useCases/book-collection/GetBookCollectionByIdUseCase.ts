import { BookCollection } from '@prisma/client';

import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';
import { GetCollectionByIdUseCase } from '../collection/GetCollectionByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { BookCollectionNotFound } from '../../errors/book-collection/BookCollectionNotFound';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookCollectionRepository } from '../../repositories/interfaces/IBookCollectionRepository';

interface IInput {
  bookId: string;
  collectionId: string;
  userId: string;
}

export class GetBookCollectionByIdUseCase
  implements IUseCase<IInput, BookCollection | null>
{
  constructor(
    private readonly bookCollectionRepository: IBookCollectionRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getCollectionByIdUseCase: GetCollectionByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({
    bookId,
    collectionId,
    userId,
  }: IInput): Promise<BookCollection> {
    await this.getBookByIdUseCase.execute({ bookId, userId });

    await this.getCollectionByIdUseCase.execute({ collectionId, userId });

    await this.getUserByIdUseCase.execute(userId);

    const bookCollection = await this.bookCollectionRepository.findById({
      bookId,
      collectionId,
      userId,
    });

    if (!bookCollection) {
      throw new BookCollectionNotFound();
    }

    return bookCollection;
  }
}
