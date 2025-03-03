import { GetGoogleBookByAuthorUseCase } from '../../application/useCases/google-books/GetGoogleBookByAuthorUseCase';

import { makeGoogleBooksRepository } from './makeGoogleBooksRepository';

export function makeGetGoogleBookByAuthorUseCase() {
  return new GetGoogleBookByAuthorUseCase(makeGoogleBooksRepository());
}
