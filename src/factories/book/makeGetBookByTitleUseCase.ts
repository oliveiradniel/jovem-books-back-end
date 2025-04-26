import { GetBookByTitleUseCase } from '../../application/useCases/book/GetBookByTitleUseCase';

import { makeBookRepository } from './makeBookRepository';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';

export function makeGetBookByTitleUseCase() {
  return new GetBookByTitleUseCase(
    makeBookRepository(),
    makeGetUserByIdUseCase(),
  );
}
