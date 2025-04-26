import { GetGoogleBooksByTitleUseCase } from '../../application/useCases/google-books/GetGoogleBooksByTitleUseCase';

import { makeGoogleBooksRepository } from './makeGoogleBooksRepository';

export function makeGetGoogleBooksByTitleUseCase() {
  return new GetGoogleBooksByTitleUseCase(makeGoogleBooksRepository());
}
