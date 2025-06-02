import { GetBookByIdUseCase } from './GetBookByIdUseCase';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IBookRepository,
  TDeleteBook,
} from '../../repositories/interfaces/IBookRepository';
import { DeleteObjectUseCase } from '../s3/DeleteObjectUseCase';

export class DeleteBookUseCase implements IUseCase<TDeleteBook, void> {
  constructor(
    private readonly bookRepository: IBookRepository,
    private readonly getBookByIdUseCase: GetBookByIdUseCase,
    private readonly deleteObjectUseCase: DeleteObjectUseCase,
  ) {}

  async execute({ userId, bookId }: TDeleteBook): Promise<void> {
    const book = await this.getBookByIdUseCase.execute({
      bookId,
      userId,
    });

    const imagePath = book.imagePath;

    await this.bookRepository.delete({ bookId, userId });

    if (imagePath) {
      await this.deleteObjectUseCase.execute({ key: imagePath });
    }
  }
}
