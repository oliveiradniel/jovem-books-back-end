import axios from 'axios';

import { env } from '../../config/env';

import GoogleBooksMapper from './APIRepositories/mappers/GoogleBooksMapper';

import { IBook } from '../../@types/IBook';
import { IGoogleBooks } from '../../@types/GoogleBook';

import {
  IGetGoogleBookURL,
  IGoogleBooksAPIRepository,
  TGetGoogleBooksByAuthor,
  TGetGoogleBooksByTitle,
} from './interfaces/IGoogleBooksAPIRepository';

export class GoogleBooksAPIRepository implements IGoogleBooksAPIRepository {
  private getURL({
    queryParam,
    startIndex = 0,
    maxResults = 20,
  }: IGetGoogleBookURL): string {
    return `https://www.googleapis.com/books/v1/volumes?q=${queryParam}&langRestrict=pt&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&key=${env.GOOGLE_API_KEY}`;
  }

  async findByTitle({
    title,
  }: // startIndex,
  // maxResults,
  TGetGoogleBooksByTitle): Promise<IBook[] | null> {
    const url = this.getURL({
      queryParam: `intitle:${title}`,
      // startIndex,
      // maxResults,
    });

    const { data }: IGoogleBooks = await axios.get(url);

    if (!data.items) {
      return null;
    }

    const books = GoogleBooksMapper.toDomain(data.items);

    return books;
  }

  async findByAuthor({
    author,
  }: // startIndex,
  // maxResults,
  TGetGoogleBooksByAuthor): Promise<IBook[] | null> {
    const url = this.getURL({
      queryParam: `inauthor:${author}`,
      // startIndex,
      // maxResults,
    });

    const { data }: IGoogleBooks = await axios.get(url);

    if (!data.items) {
      return null;
    }

    const books = GoogleBooksMapper.toDomain(data.items);

    return books;
  }
}
