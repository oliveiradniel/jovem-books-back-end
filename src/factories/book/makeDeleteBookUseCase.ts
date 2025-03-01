import { DeleteBookUseCase } from '../../application/useCases/book/DeleteBookUseCase';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookRepository } from './makeBookRepository';
import { makeGetBookByIdUseCase } from './makeGetBookByIdUseCase';

export function makeDeleteBookUseCase() {
  return new DeleteBookUseCase(
    makeBookRepository(),
    makeGetBookByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
