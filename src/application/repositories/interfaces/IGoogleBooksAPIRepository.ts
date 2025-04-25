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
      smallThumbnail: string | null;
      thumbnail: string | null;
      small: string | null;
      medium: string | null;
      large: string | null;
      extraLarge: string | null;
    };
  };
}

export interface IGoogleBooks {
  data: {
    items: IGoogleBook[];
  };
}

export interface IBook {
  id: string;
  title: string;
  authors: string[];
  sinopse: string;
  numberOfPages: number | null;
  dateOfPublication: Date;
  imagePath: string | null;
}

export interface IGetURL {
  queryParam: string;
  startIndex?: number;
  maxResults?: number;
}

export type IFindByTitle = Omit<IGetURL, 'queryParam'> & { title: string };

export type IFindByAuthor = Omit<IGetURL, 'queryParam'> & {
  author: string;
};

export interface IGoogleBooksAPIRepository {
  findByTitle({
    title,
    startIndex,
    maxResults,
  }: IFindByTitle): Promise<IBook[] | null>;
  findByAuthor({
    author,
    startIndex,
    maxResults,
  }: IFindByAuthor): Promise<IBook[] | null>;
}
