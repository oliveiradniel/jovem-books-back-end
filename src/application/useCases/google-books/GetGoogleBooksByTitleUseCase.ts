import { IBook } from '../../../@types/IBook';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IGoogleBooksAPIRepository,
  TGetGoogleBooksByTitle,
} from '../../repositories/interfaces/IGoogleBooksAPIRepository';

export class GetGoogleBooksByTitleUseCase
  implements IUseCase<TGetGoogleBooksByTitle, IBook[] | null>
{
  constructor(
    private readonly googleBooksRepository: IGoogleBooksAPIRepository,
  ) {}

  async execute(data: TGetGoogleBooksByTitle): Promise<IBook[] | null> {
    const googleBooks = await this.googleBooksRepository.findByTitle(data);

    return googleBooks;
  }
}
