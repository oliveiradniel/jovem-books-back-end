import {
  IBookResponse,
  IGoogleBook,
} from '../interfaces/IGoogleBooksAPIRepository';

class GoogleBooksMapper {
  // toPersistence(domainGoogleBooks) {}

  toDomain(persistenceGoogleBooks: IGoogleBook[]): IBookResponse[] {
    const books = persistenceGoogleBooks.map(googleBook => ({
      id: googleBook.id,
      title: googleBook.volumeInfo.title,
      author: googleBook.volumeInfo.authors,
      sinopse: googleBook.volumeInfo.description,
      numberOfPages: googleBook.volumeInfo.pageCount ?? null,
      type: googleBook.volumeInfo.categories,
      dateOfPublication: new Date(googleBook.volumeInfo.publishedDate),
    }));

    return books;
  }
}

export default new GoogleBooksMapper();
