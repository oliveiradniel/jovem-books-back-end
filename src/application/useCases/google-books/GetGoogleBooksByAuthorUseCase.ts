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

  async execute({
    startIndex,
    author,
  }: TGetGoogleBooksByAuthor): Promise<IBookWithTotalItems | null> {
    const googleBooks = await this.googleBooksRepository.findByAuthor({
      startIndex,
      author,
    });

    return googleBooks;
  }
}
