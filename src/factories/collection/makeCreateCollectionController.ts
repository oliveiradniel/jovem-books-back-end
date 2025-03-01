import { CreateCollectionController } from '../../application/controllers/collection/CreateCollectionController';

import { makeCreateCollectionUseCase } from './makeCreateCollectionUseCase';

export function makeCreateCollectionController() {
  return new CreateCollectionController(makeCreateCollectionUseCase());
}
