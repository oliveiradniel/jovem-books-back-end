import { IBook } from '../../../@types/IBook';

import { IUseCase } from '../../interfaces/IUseCase';

import {
  IGoogleBooksAPIRepository,
  TGetGoogleBooksByAuthor,
} from '../../repositories/interfaces/IGoogleBooksAPIRepository';

export class GetGoogleBooksByAuthorUseCase
  implements IUseCase<TGetGoogleBooksByAuthor, IBook[] | null>
{
  constructor(
    private readonly googleBooksRepository: IGoogleBooksAPIRepository,
  ) {}

  async execute({ author }: TGetGoogleBooksByAuthor): Promise<IBook[] | null> {
    const googleBooks = await this.googleBooksRepository.findByAuthor({
      author,
    });

    return googleBooks;
  }
}
