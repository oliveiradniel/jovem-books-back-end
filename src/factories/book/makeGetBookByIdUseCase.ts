import { GetBookByIdUseCase } from '../../application/useCases/book/GetBookByIdUseCase';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookRepository } from './makeBookRepository';

export function makeGetBookByIdUseCase() {
  return new GetBookByIdUseCase(makeBookRepository(), makeGetUserByIdUseCase());
}
