import { z } from 'zod';

import {
  GetGoogleBooksByAuthorSchema,
  GetGoogleBooksByTitleSchema,
} from '../../schemas/google-books';

import { TGoogleBookResponse } from '../../../@types/GoogleBooks';

export interface IGetGoogleBooksURL {
  queryParam: string;
}

export type TGetGoogleBooksByTitle = z.infer<
  typeof GetGoogleBooksByTitleSchema
>;

export type TGetGoogleBooksByAuthor = z.infer<
  typeof GetGoogleBooksByAuthorSchema
>;

export interface IGoogleBooksAPIRepository {
  findByTitle(
    title: TGetGoogleBooksByTitle,
  ): Promise<TGoogleBookResponse[] | null>;
  findByAuthor(
    author: TGetGoogleBooksByAuthor,
  ): Promise<TGoogleBookResponse[] | null>;
}
