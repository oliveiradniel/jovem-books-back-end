export interface IGoogleBook {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    description: string;
    pageCount: number;
    categories: string[];
    imageLinks: {
      thumbnail: string;
    };
  };
}

export interface IGoogleBooks {
  data: {
    items: IGoogleBook[];
  };
}

export interface IBookResponse {
  id: string;
  title: string;
  author: string[];
  sinopse: string;
  numberOfPages: number | null;
  dateOfPublication: Date;
}

export interface IGetURL {
  queryParam: string;
  startIndex?: number;
  maxResults?: number;
}

export type IFindByTitle = Omit<IGetURL, 'queryParam'> & { title: string };

export type IFindByAuthor = Omit<IGetURL, 'queryParam'> & {
  authorName: string;
};

export interface IGoogleBooksAPIRepository {
  findByTitle({
    title,
    startIndex,
    maxResults,
  }: IFindByTitle): Promise<IBookResponse[]>;
  findByAuthor({
    authorName,
    startIndex,
    maxResults,
  }: IFindByAuthor): Promise<IBookResponse[]>;
}
