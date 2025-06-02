import { DeleteBookUseCase } from '../../application/useCases/book/DeleteBookUseCase';

import { makeBookRepository } from './makeBookRepository';

import { makeGetBookByIdUseCase } from './makeGetBookByIdUseCase';
import { makeDeleteObjectUseCase } from '../s3/makeDeleteObjectUseCase';

export function makeDeleteBookUseCase() {
  return new DeleteBookUseCase(
    makeBookRepository(),
    makeGetBookByIdUseCase(),
    makeDeleteObjectUseCase(),
  );
}
