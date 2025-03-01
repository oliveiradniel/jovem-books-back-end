import { DeleteCollectionController } from '../../application/controllers/collection/DeleteCollectionController';

import { makeDeleteCollectionUseCase } from './makeDeleteCollectionUseCase';

export function makeDeleteCollectionController() {
  return new DeleteCollectionController(makeDeleteCollectionUseCase());
}
