import axios from 'axios';

import { env } from '../../config/env';

import GoogleBooksMapper from './APIRepositories/mappers/GoogleBooksMapper';

import { IGoogleBooks, TGoogleBookResponse } from '../../@types/GoogleBooks';

import {
  IGetGoogleBooksURL,
  IGoogleBooksAPIRepository,
  TGetGoogleBooksByAuthor,
  TGetGoogleBooksByTitle,
} from './interfaces/IGoogleBooksAPIRepository';

export class GoogleBooksAPIRepository implements IGoogleBooksAPIRepository {
  private getURL({ queryParam }: IGetGoogleBooksURL): string {
    return `https://www.googleapis.com/books/v1/volumes?q=${queryParam}&langRestrict=pt&printType=books&maxResults=20&key=${env.GOOGLE_API_KEY}`;
  }

  async findByTitle(
    title: TGetGoogleBooksByTitle,
  ): Promise<TGoogleBookResponse[] | null> {
    const url = this.getURL({
      queryParam: `intitle:${title}`,
    });

    const { data }: IGoogleBooks = await axios.get(url);

    if (!data.items) {
      return null;
    }

    const googleBooks = GoogleBooksMapper.toDomain({ data });

    return googleBooks;
  }

  async findByAuthor(
    author: TGetGoogleBooksByAuthor,
  ): Promise<TGoogleBookResponse[] | null> {
    const url = this.getURL({
      queryParam: `inauthor:${author}`,
    });

    const { data }: IGoogleBooks = await axios.get(url);

    if (!data.items) {
      return null;
    }

    const googleBooks = GoogleBooksMapper.toDomain({ data });

    return googleBooks;
  }
}
