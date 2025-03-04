import axios, { AxiosResponse } from 'axios';

import { env } from '../../../config/env';

import {
  IFindByAuthor,
  IFindByTitle,
  IGetURL,
  IGoogleBooksAPIRepository,
  IGoogleBooksResponse,
} from './interfaces/IGoogleBooksAPIRepository';

export class GoogleBooksAPIRepository implements IGoogleBooksAPIRepository {
  private getURL({
    queryParam,
    startIndex = 0,
    maxResults = 20,
  }: IGetURL): string {
    return `https://www.googleapis.com/books/v1/volumes?q=${queryParam}&langRestrict=pt&printType=books&projection=lite&startIndex=${startIndex}&maxResults=${maxResults}&key=${env.GOOGLE_API_KEY}`;
  }

  async findByTitle({
    title,
    startIndex,
    maxResults,
  }: IFindByTitle): Promise<AxiosResponse<IGoogleBooksResponse>> {
    const url = this.getURL({
      queryParam: `intitle:${title}`,
      startIndex,
      maxResults,
    });
    const response = await axios.get(url);
    console.log(response.data);

    return response.data;
  }

  async findByAuthor({
    authorName,
    startIndex,
    maxResults,
  }: IFindByAuthor): Promise<AxiosResponse<IGoogleBooksResponse>> {
    const url = this.getURL({
      queryParam: `inauthor:${authorName}`,
      startIndex,
      maxResults,
    });

    const response = await axios.get(url);

    return response.data;
  }
}
