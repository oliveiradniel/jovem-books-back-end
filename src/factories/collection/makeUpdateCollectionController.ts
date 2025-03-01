import { UpdateCollectionController } from '../../application/controllers/collection/UpdateCollectionController';

import { makeUpdateCollectionUseCase } from './makeUpdateCollectionUseCase';

export function makeUpdateCollectionController() {
  return new UpdateCollectionController(makeUpdateCollectionUseCase());
}
