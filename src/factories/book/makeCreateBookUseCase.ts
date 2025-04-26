import { CreateBookUseCase } from '../../application/useCases/book/CreateBookUseCase';

import { makeBookRepository } from './makeBookRepository';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeGetBookByTitleUseCase } from './makeGetBookByTitleUseCase';

export function makeCreateBookUseCase() {
  return new CreateBookUseCase(
    makeBookRepository(),
    makeGetBookByTitleUseCase(),
    makeGetUserByIdUseCase(),
  );
}
