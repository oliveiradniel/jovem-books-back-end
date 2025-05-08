import { IUseCase } from '../../interfaces/IUseCase';

import {
  IGoogleBooksAPIRepository,
  TGetGoogleBooksByTitle,
} from '../../repositories/interfaces/IGoogleBooksAPIRepository';

import { TGoogleBookResponse } from '../../../@types/GoogleBooks';

export class GetGoogleBooksByTitleUseCase
  implements IUseCase<TGetGoogleBooksByTitle, TGoogleBookResponse[] | null>
{
  constructor(
    private readonly googleBooksRepository: IGoogleBooksAPIRepository,
  ) {}

  async execute(
    title: TGetGoogleBooksByTitle,
  ): Promise<TGoogleBookResponse[] | null> {
    const googleBooks = await this.googleBooksRepository.findByTitle(title);

    return googleBooks;
  }
}
