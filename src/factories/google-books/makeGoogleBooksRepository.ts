import { GoogleBooksAPIRepository } from '../../application/repositories/GoogleBooksAPIRepository';

export function makeGoogleBooksRepository() {
  return new GoogleBooksAPIRepository();
}
