import { CreateBookCollectionController } from '../../application/controllers/book-collection/CreateBookCollectionController';

import { makeCreateBookCollectionUseCase } from './makeCreateBookCollectionUseCase';

export function makeCreateBookCollectionController() {
  return new CreateBookCollectionController(makeCreateBookCollectionUseCase());
}
