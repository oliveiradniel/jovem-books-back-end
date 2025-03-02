import { ListBooksByCollectionIdController } from '../../application/controllers/book-collection/ListBooksByCollectionIdController';

import { makeListBooksByCollectionIdUseCase } from './makeListBooksByCollectionIdUseCase';

export function makeListBooksByCollectionIdController() {
  return new ListBooksByCollectionIdController(
    makeListBooksByCollectionIdUseCase(),
  );
}
