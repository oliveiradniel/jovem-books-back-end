import { AxiosResponse } from 'axios';
import { IUseCase } from '../../interfaces/IUseCase';

import {
  IGoogleBooksAPIRepository,
  IGoogleBooksResponse,
} from '../../repositories/APIRepositories/interfaces/IGoogleBooksAPIRepository';

interface IInput {
  title: string;
  startIndex: number;
  maxResults: number;
}

export class GetGoogleBookByTitleUseCase
  implements IUseCase<IInput, AxiosResponse<IGoogleBooksResponse>>
{
  constructor(
    private readonly googleBooksRepository: IGoogleBooksAPIRepository,
  ) {}

  async execute(data: IInput): Promise<AxiosResponse<IGoogleBooksResponse>> {
    console.log('antes');
    const googleBooks = await this.googleBooksRepository.findByTitle(data);

    return googleBooks;
  }
}
