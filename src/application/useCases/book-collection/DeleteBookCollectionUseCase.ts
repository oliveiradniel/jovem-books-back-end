import { GetBookByIdUseCase } from '../book/GetBookByIdUseCase';
import { GetCollectionByIdUseCase } from '../collection/GetCollectionByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookCollectionRepository } from '../../repositories/interfaces/IBookCollectionRepository';
import { GetBookCollectionByIdUseCase } from './GetBookCollectionByIdUseCase';

interface IInput {
  bookCollectionId: {
    bookId: string;
    collectionId: string;
  };
  userId: string;
}

export class DeleteBookCollectionUseCase implements IUseCase<IInput, void> {
  constructor(
    private readonly bookCollectionRepository: IBookCollectionRepository,
    private readonly getBookCollectionByIdUseCase: GetBookCollectionByIdUseCase,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getCollectionByIdUseCase: GetCollectionByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ bookCollectionId, userId }: IInput): Promise<void> {
    const { bookId, collectionId } = bookCollectionId;

    await this.getBookByIdUseCase.execute({ bookId, userId });

    await this.getCollectionByIdUseCase.execute({ collectionId, userId });

    await this.getUserByIdUseCase.execute({ userId });
    await this.getBookCollectionByIdUseCase.execute({
      bookCollectionId,
      userId,
    });

    await this.bookCollectionRepository.delete({
      bookCollectionId,
      userId,
    });
  }
}
