import { BookCollectionRepository } from '../../application/repositories/BookCollectionRepository';

export function makeBookCollectionRepository() {
  return new BookCollectionRepository();
}
