import { GoogleBooksAPIRepository } from '../../application/repositories/APIRepositories/GoogleBooksAPIRepository';

export function makeGoogleBooksRepository() {
  return new GoogleBooksAPIRepository();
}
