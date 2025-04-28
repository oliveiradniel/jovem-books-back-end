import { z } from 'zod';

import { IBookWithTotalItems } from '../../../@types/IBook';

import {
  GetGoogleBooksByAuthorSchema,
  GetGoogleBooksByTitleSchema,
} from '../../schemas/google-books';

export interface IGetGoogleBookURL {
  queryParam: string;
  startIndex?: number;
  maxResults?: number;
}

export type TGetGoogleBooksByTitle = z.infer<
  typeof GetGoogleBooksByTitleSchema
>;

export type TGetGoogleBooksByAuthor = z.infer<
  typeof GetGoogleBooksByAuthorSchema
>;

export interface IGoogleBooksAPIRepository {
  findByTitle({
    startIndex,
    title,
  }: TGetGoogleBooksByTitle): Promise<IBookWithTotalItems | null>;
  findByAuthor({
    startIndex,
    author,
  }: TGetGoogleBooksByAuthor): Promise<IBookWithTotalItems | null>;
}
