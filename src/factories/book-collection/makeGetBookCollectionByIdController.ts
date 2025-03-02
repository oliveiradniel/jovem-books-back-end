import { GetBookCollectionByIdController } from '../../application/controllers/book-collection/GetBookCollectionByIdController';

import { makeGetBookCollectionByIdUseCase } from './makeGetBookCollectionByIdUseCase';

export function makeGetBookCollectionByIdController() {
  return new GetBookCollectionByIdController(
    makeGetBookCollectionByIdUseCase(),
  );
}
