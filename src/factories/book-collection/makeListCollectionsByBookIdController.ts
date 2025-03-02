import { ListCollectionsByBookIdController } from '../../application/controllers/book-collection/ListCollectionsByBookIdController';

import { makeListCollectionsByBookIdUseCase } from './makeListCollectionsByBookIdUseCase';

export function makeListCollectionsByBookIdController() {
  return new ListCollectionsByBookIdController(
    makeListCollectionsByBookIdUseCase(),
  );
}
