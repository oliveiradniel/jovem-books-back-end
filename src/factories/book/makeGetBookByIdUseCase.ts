import { GetBookByIdUseCase } from '../../application/useCases/book/GetBookByIdUseCase';

import { makeBookRepository } from './makeBookRepository';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';

export function makeGetBookByIdUseCase() {
  return new GetBookByIdUseCase(makeBookRepository(), makeGetUserByIdUseCase());
}
