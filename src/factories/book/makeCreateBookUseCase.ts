import { CreateBookUseCase } from '../../application/useCases/book/CreateBookUseCase';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookRepository } from './makeBookRepository';

export function makeCreateBookUseCase() {
  return new CreateBookUseCase(makeBookRepository(), makeGetUserByIdUseCase());
}
