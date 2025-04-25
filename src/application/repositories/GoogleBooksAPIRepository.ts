import axios from 'axios';

import { env } from '../../config/env';

import {
  IBook,
  IFindByAuthor,
  IFindByTitle,
  IGetURL,
  IGoogleBooks,
  IGoogleBooksAPIRepository,
} from './interfaces/IGoogleBooksAPIRepository';

import GoogleBooksMapper from './APIRepositories/mappers/GoogleBooksMapper';

export class GoogleBooksAPIRepository implements IGoogleBooksAPIRepository {
  private getURL({
    queryParam,
    startIndex = 0,
    maxResults = 20,
  }: IGetURL): string {
    return `https://www.googleapis.com/books/v1/volumes?q=${queryParam}&langRestrict=pt&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&key=${env.GOOGLE_API_KEY}`;
  }

  async findByTitle({
    title,
    startIndex,
    maxResults,
  }: IFindByTitle): Promise<IBook[] | null> {
    const url = this.getURL({
      queryParam: `intitle:${title}`,
      startIndex,
      maxResults,
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
    startIndex,
    maxResults,
  }: IFindByAuthor): Promise<IBook[] | null> {
    const url = this.getURL({
      queryParam: `inauthor:${author}`,
      startIndex,
      maxResults,
    });

    const { data }: IGoogleBooks = await axios.get(url);

    if (!data.items) {
      return null;
    }

    const books = GoogleBooksMapper.toDomain(data.items);

    return books;
  }
}
