import { IGoogleBooks } from '../../../../@types/GoogleBook';
import { IBookWithTotalItems } from '../../../../@types/IBook';

class GoogleBooksMapper {
  // toPersistence(domainGoogleBooks) {}

  toDomain({ data }: IGoogleBooks): IBookWithTotalItems {
    const books = data.items.map(googleBook => ({
      id: googleBook.id,
      title: googleBook.volumeInfo.title,
      authors: googleBook.volumeInfo.authors,
      sinopse: googleBook.volumeInfo.description,
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

    return {
      totalItems: data.totalItems,
      data: books,
    };
  }
}

export default new GoogleBooksMapper();
