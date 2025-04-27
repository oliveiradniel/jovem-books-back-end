import { IUseCase } from '../../interfaces/IUseCase';

import { IBookWithTotalItems } from '../../../@types/IBook';

import {
  IGoogleBooksAPIRepository,
  TGetGoogleBooksByTitle,
} from '../../repositories/interfaces/IGoogleBooksAPIRepository';

export class GetGoogleBooksByTitleUseCase
  implements IUseCase<TGetGoogleBooksByTitle, IBookWithTotalItems | null>
{
  constructor(
    private readonly googleBooksRepository: IGoogleBooksAPIRepository,
  ) {}

  async execute(
    data: TGetGoogleBooksByTitle,
  ): Promise<IBookWithTotalItems | null> {
    const googleBooks = await this.googleBooksRepository.findByTitle(data);

    return googleBooks;
  }
}
