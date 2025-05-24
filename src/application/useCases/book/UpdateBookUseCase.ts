import { TBook } from '../../../@types/Book';

import { GetBookByIdUseCase } from './GetBookByIdUseCase';
import { GetBookByTitleUseCase } from './GetBookByTitleUseCase';
import { DeleteObjectUseCase } from '../s3/DeleteObjectUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import { TitleAlreadyInUse } from '../../errors/book/TitleAlreadyInUse';

import {
  IBookRepository,
  TUpdateBook,
} from '../../repositories/interfaces/IBookRepository';

export class UpdateBookUseCase implements IUseCase<TUpdateBook, TBook | null> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly getBookByTitleUseCase: GetBookByTitleUseCase,
    private readonly deleteObjectUseCase: DeleteObjectUseCase,
  ) {}

  async execute({
    bookId,
    userId,
    removeImage,
    ...data
  }: TUpdateBook): Promise<TBook | null> {
    const book = await this.getBookByIdUseCase.execute({
      bookId,
      userId,
    });

    if (data.title) {
      const bookDataWithTheTitleInUse =
        await this.getBookByTitleUseCase.execute({
          userId,
          title: data.title!,
          shouldReturn: true,
        });

      if (
        bookDataWithTheTitleInUse &&
        bookDataWithTheTitleInUse.id !== bookId
      ) {
        throw new TitleAlreadyInUse();
      }
    }

    if (!this.bookRepository?.update) {
      return null;
    }

    if (removeImage && book.imagePath) {
      await this.deleteObjectUseCase.execute({ key: book.imagePath });
    }

    if (book.imagePath && data.imagePath && book.imagePath !== data.imagePath) {
      await this.deleteObjectUseCase.execute({ key: book.imagePath });
    }

    return await this.bookRepository.update({ userId, bookId, ...data });
  }
}
