import { ListBooksUseCase } from '../../application/useCases/book/ListBooksUseCase';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookRepository } from './makeBookRepository';

export function makeListBooksUseCase() {
  return new ListBooksUseCase(makeBookRepository(), makeGetUserByIdUseCase());
}
