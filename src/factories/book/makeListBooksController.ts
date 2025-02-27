import { ListBooksController } from '../../application/controllers/book/ListBooksController';

import { makeListBooksUseCase } from './makeListBooksUseCase';

export function makeListBooksController() {
  return new ListBooksController(makeListBooksUseCase());
}
