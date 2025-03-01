import { ListCollectionsController } from '../../application/controllers/collection/ListCollectionsController';
import { makeListCollectionsUseCase } from './makeListCollectionsUseCase';

export function makeListCollectionsController() {
  return new ListCollectionsController(makeListCollectionsUseCase());
}
