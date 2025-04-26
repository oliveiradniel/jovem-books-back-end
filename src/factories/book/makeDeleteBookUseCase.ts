import { DeleteBookUseCase } from '../../application/useCases/book/DeleteBookUseCase';

import { makeBookRepository } from './makeBookRepository';

import { makeGetBookByIdUseCase } from './makeGetBookByIdUseCase';

export function makeDeleteBookUseCase() {
  return new DeleteBookUseCase(makeBookRepository(), makeGetBookByIdUseCase());
}
