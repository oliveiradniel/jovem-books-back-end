import { AxiosResponse } from 'axios';
import { IUseCase } from '../../interfaces/IUseCase';

import {
  IGoogleBooksAPIRepository,
  IGoogleBooksResponse,
} from '../../repositories/APIRepositories/interfaces/IGoogleBooksAPIRepository';

interface IInput {
  authorName: string;
  startIndex: number;
  maxResults: number;
}

export class GetGoogleBookByAuthorUseCase
  implements IUseCase<IInput, AxiosResponse<IGoogleBooksResponse>>
{
  constructor(
    private readonly googleBooksRepository: IGoogleBooksAPIRepository,
  ) {}

  async execute(data: IInput): Promise<AxiosResponse<IGoogleBooksResponse>> {
    const googleBooks = await this.googleBooksRepository.findByAuthor(data);

    return googleBooks;
  }
}
