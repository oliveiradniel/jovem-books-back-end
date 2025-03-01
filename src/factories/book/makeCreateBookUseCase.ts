import { CreateBookUseCase } from '../../application/useCases/book/CreateBookUseCase';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookRepository } from './makeBookRepository';
import { makeGetBookByTitleUseCase } from './makeGetBookByTitleUseCase';

export function makeCreateBookUseCase() {
  return new CreateBookUseCase(
    makeBookRepository(),
    makeGetBookByTitleUseCase(),
    makeGetUserByIdUseCase(),
  );
}
