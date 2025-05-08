import {
  IGoogleBooks,
  TGoogleBookResponse,
} from '../../../../@types/GoogleBooks';

class GoogleBooksMapper {
  // toPersistence(domainGoogleBooks) {}

  toDomain({ data }: IGoogleBooks): TGoogleBookResponse[] {
    const books = data.items.map(googleBook => ({
      id: googleBook.id,
      title: googleBook.volumeInfo.title,
      authors: googleBook.volumeInfo.authors,
      sinopse: googleBook.volumeInfo.description ?? null,
      numberOfPages: googleBook.volumeInfo.pageCount ?? null,
      literaryGenre: googleBook.volumeInfo.categories,
      imagePath:
        googleBook.volumeInfo.imageLinks?.extraLarge ||
        googleBook.volumeInfo.imageLinks?.large ||
        googleBook.volumeInfo.imageLinks?.medium ||
        googleBook.volumeInfo.imageLinks?.small ||
        googleBook.volumeInfo.imageLinks?.smallThumbnail ||
        googleBook.volumeInfo.imageLinks?.thumbnail,
      dateOfPublication: new Date(googleBook.volumeInfo.publishedDate),
    }));

    return books;
  }
}

export default new GoogleBooksMapper();
