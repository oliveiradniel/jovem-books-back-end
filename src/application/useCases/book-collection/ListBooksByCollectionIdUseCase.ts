import { Book } from '@prisma/client';

import { GetCollectionByIdUseCase } from '../collection/GetCollectionByIdUseCase';
import { GetUserByIdUseCase } from '../user/GetUserByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { IBookCollectionRepository } from '../../repositories/interfaces/IBookCollectionRepository';

interface IInput {
  collectionId: string;
  userId: string;
}

export class ListBooksByCollectionIdUseCase
  implements IUseCase<IInput, Book[]>
{
  constructor(
    private readonly bookCollectionRepository: IBookCollectionRepository,
    private readonly getCollectionByIdUseCase: GetCollectionByIdUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async execute({ collectionId, userId }: IInput): Promise<Book[]> {
    await this.getCollectionByIdUseCase.execute({ collectionId, userId });

    await this.getUserByIdUseCase.execute({ userId });

    const books = await this.bookCollectionRepository.listBooksByCollectionId({
      collectionId,
      userId,
    });

    return books;
  }
}
