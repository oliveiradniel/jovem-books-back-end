import { BookRepository } from '../../application/repositories/BookRepository';

export function makeBookRepository() {
  return new BookRepository();
}
