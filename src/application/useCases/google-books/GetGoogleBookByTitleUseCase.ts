import { IUseCase } from '../../interfaces/IUseCase';

import {
  IGoogleBooksAPIRepository,
  IBook,
} from '../../repositories/interfaces/IGoogleBooksAPIRepository';

interface IInput {
  title: string;
  startIndex?: number;
  maxResults?: number;
}

export class GetGoogleBookByTitleUseCase implements IUseCase<IInput, IBook[]> {
  constructor(
    private readonly googleBooksRepository: IGoogleBooksAPIRepository,
  ) {}

  async execute(data: IInput): Promise<IBook[]> {
    const googleBooks = await this.googleBooksRepository.findByTitle(data);

    return googleBooks;
  }
}
