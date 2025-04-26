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
