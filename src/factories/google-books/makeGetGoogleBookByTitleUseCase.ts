import { GetGoogleBookByTitleUseCase } from '../../application/useCases/google-books/GetGoogleBookByTitleUseCase';

import { makeGoogleBooksRepository } from './makeGoogleBooksRepository';

export function makeGetGoogleBookByTitleUseCase() {
  return new GetGoogleBookByTitleUseCase(makeGoogleBooksRepository());
}
