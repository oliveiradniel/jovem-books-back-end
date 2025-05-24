import { UpdateBookUseCase } from '../../application/useCases/book/UpdateBookUseCase';
import { makeDeleteObjectUseCase } from '../s3/makeDeleteObjectUseCase';

import { makeBookRepository } from './makeBookRepository';

import { makeGetBookByIdUseCase } from './makeGetBookByIdUseCase';
import { makeGetBookByTitleUseCase } from './makeGetBookByTitleUseCase';

export function makeUpdateBookUseCase() {
  return new UpdateBookUseCase(
    makeBookRepository(),
    makeGetBookByIdUseCase(),
    makeGetBookByTitleUseCase(),
    makeDeleteObjectUseCase(),
  );
}
