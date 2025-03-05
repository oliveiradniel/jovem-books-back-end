import axios from 'axios';

import { env } from '../../../config/env';

import {
  IBookResponse,
  IFindByAuthor,
  IFindByTitle,
  IGetURL,
  IGoogleBooks,
  IGoogleBooksAPIRepository,
} from './interfaces/IGoogleBooksAPIRepository';

import GoogleBooksMapper from './mappers/GoogleBooksMapper';

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
  }: IFindByTitle): Promise<IBookResponse[]> {
    const url = this.getURL({
      queryParam: `intitle:${title}`,
      startIndex,
      maxResults,
    });

    const { data }: IGoogleBooks = await axios.get(url);

    const googleBooks = data.items;

    return GoogleBooksMapper.toDomain(googleBooks);
  }

  async findByAuthor({
    authorName,
    startIndex,
    maxResults,
  }: IFindByAuthor): Promise<IBookResponse[]> {
    const url = this.getURL({
      queryParam: `inauthor:${authorName}`,
      startIndex,
      maxResults,
    });

    const { data }: IGoogleBooks = await axios.get(url);

    const googleBooks = data.items;

    return GoogleBooksMapper.toDomain(googleBooks);
  }
}
