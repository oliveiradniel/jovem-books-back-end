import axios from 'axios';

import { env } from '../../config/env';

import GoogleBooksMapper from './APIRepositories/mappers/GoogleBooksMapper';

import { IBookWithTotalItems } from '../../@types/IBook';
import { IGoogleBooks } from '../../@types/GoogleBook';

import {
  IGetGoogleBookURL,
  IGoogleBooksAPIRepository,
  TGetGoogleBooksByAuthor,
  TGetGoogleBooksByTitle,
} from './interfaces/IGoogleBooksAPIRepository';

export class GoogleBooksAPIRepository implements IGoogleBooksAPIRepository {
  private getURL({ queryParam, startIndex = 0 }: IGetGoogleBookURL): string {
    return `https://www.googleapis.com/books/v1/volumes?q=${queryParam}&langRestrict=pt&printType=books&startIndex=${startIndex}&maxResults=20&key=${env.GOOGLE_API_KEY}`;
  }

  async findByTitle({
    startIndex,
    title,
  }: TGetGoogleBooksByTitle): Promise<IBookWithTotalItems | null> {
    const url = this.getURL({
      queryParam: `intitle:${title}`,
      startIndex,
    });
    const { data }: IGoogleBooks = await axios.get(url);

    if (!data.items) {
      return null;
    }

    const books = GoogleBooksMapper.toDomain({ data });

    return books;
  }

  async findByAuthor({
    startIndex,
    author,
  }: TGetGoogleBooksByAuthor): Promise<IBookWithTotalItems | null> {
    const url = this.getURL({
      queryParam: `inauthor:${author}`,
      startIndex,
    });

    const { data }: IGoogleBooks = await axios.get(url);

    if (!data.items) {
      return null;
    }

    const books = GoogleBooksMapper.toDomain({ data });

    return books;
  }
}
