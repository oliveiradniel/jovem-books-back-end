import { UpdateBookUseCase } from '../../application/useCases/book/UpdateBookUseCase';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookRepository } from './makeBookRepository';
import { makeGetBookByIdUseCase } from './makeGetBookByIdUseCase';

export function makeUpdateBookUseCase() {
  return new UpdateBookUseCase(
    makeBookRepository(),
    makeGetBookByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
