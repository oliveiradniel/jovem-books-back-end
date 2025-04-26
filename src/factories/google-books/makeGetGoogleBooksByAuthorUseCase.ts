import { GetGoogleBooksByAuthorUseCase } from '../../application/useCases/google-books/GetGoogleBooksByAuthorUseCase';

import { makeGoogleBooksRepository } from './makeGoogleBooksRepository';

export function makeGetGoogleBooksByAuthorUseCase() {
  return new GetGoogleBooksByAuthorUseCase(makeGoogleBooksRepository());
}
