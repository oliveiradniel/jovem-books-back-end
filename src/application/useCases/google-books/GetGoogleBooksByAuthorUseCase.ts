import { IUseCase } from '../../interfaces/IUseCase';

import { IBookWithTotalItems } from '../../../@types/IBook';

import {
  IGoogleBooksAPIRepository,
  TGetGoogleBooksByAuthor,
} from '../../repositories/interfaces/IGoogleBooksAPIRepository';

export class GetGoogleBooksByAuthorUseCase
  implements IUseCase<TGetGoogleBooksByAuthor, IBookWithTotalItems | null>
{
  constructor(
    private readonly googleBooksRepository: IGoogleBooksAPIRepository,
  ) {}

  async execute(
    author: TGetGoogleBooksByAuthor,
  ): Promise<IBookWithTotalItems | null> {
    const googleBooks = await this.googleBooksRepository.findByAuthor(author);

    return googleBooks;
  }
}
