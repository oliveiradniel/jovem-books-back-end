import { AxiosResponse } from 'axios';

interface GoogleBooks {
  kind: string;
  id: string;
  etag: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    description: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

export interface IGoogleBooksResponse {
  kind: string;
  totalItems: number;
  items: GoogleBooks;
}

export interface IGoogleBooksAPIRepository {
  findByTitle({
    title,
    startIndex,
    maxResults,
  }: IFindByTitle): Promise<AxiosResponse<IGoogleBooksResponse>>;
  findByAuthor({
    author,
    startIndex,
    maxResults,
  }: IFindByAuthor): Promise<AxiosResponse<IGoogleBooksResponse>>;
}

export interface IGetURL {
  queryParam: string;
  startIndex?: number;
  maxResults?: number;
}

export type IFindByTitle = Omit<IGetURL, 'queryParam'> & { title: string };

export type IFindByAuthor = Omit<IGetURL, 'queryParam'> & { author: string };
