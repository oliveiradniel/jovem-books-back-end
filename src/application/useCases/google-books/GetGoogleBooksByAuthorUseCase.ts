import { IUseCase } from '../../interfaces/IUseCase';

import {
  IGoogleBooksAPIRepository,
  TGetGoogleBooksByAuthor,
} from '../../repositories/interfaces/IGoogleBooksAPIRepository';

import { TGoogleBookResponse } from '../../../@types/GoogleBooks';

export class GetGoogleBooksByAuthorUseCase
  implements IUseCase<TGetGoogleBooksByAuthor, TGoogleBookResponse[] | null>
{
  constructor(
    private readonly googleBooksRepository: IGoogleBooksAPIRepository,
  ) {}

  async execute(
    author: TGetGoogleBooksByAuthor,
  ): Promise<TGoogleBookResponse[] | null> {
    const googleBooks = await this.googleBooksRepository.findByAuthor(author);

    return googleBooks;
  }
}
