import { ListBooksUseCase } from '../../application/useCases/book/ListBooksUseCase';

import { makeUserRepository } from '../user/makeUserRepository';
import { makeBookRepository } from './makeBookRepository';

export function makeListBooksUseCase() {
  return new ListBooksUseCase(makeBookRepository(), makeUserRepository());
}
