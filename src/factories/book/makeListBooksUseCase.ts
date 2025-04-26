import { ListBooksUseCase } from '../../application/useCases/book/ListBooksUseCase';

import { makeBookRepository } from './makeBookRepository';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';

export function makeListBooksUseCase() {
  return new ListBooksUseCase(makeBookRepository(), makeGetUserByIdUseCase());
}
