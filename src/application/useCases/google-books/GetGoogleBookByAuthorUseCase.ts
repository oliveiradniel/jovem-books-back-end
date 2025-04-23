import { IUseCase } from '../../interfaces/IUseCase';

import {
  IGoogleBooksAPIRepository,
  IBook,
} from '../../repositories/interfaces/IGoogleBooksAPIRepository';

interface IInput {
  author: string;
  startIndex?: number;
  maxResults?: number;
}

export class GetGoogleBookByAuthorUseCase implements IUseCase<IInput, IBook[]> {
  constructor(
    private readonly googleBooksRepository: IGoogleBooksAPIRepository,
  ) {}

  async execute(data: IInput): Promise<IBook[]> {
    const googleBooks = await this.googleBooksRepository.findByAuthor(data);

    return googleBooks;
  }
}
