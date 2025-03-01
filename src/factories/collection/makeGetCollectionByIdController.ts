import { GetCollectionByIdController } from '../../application/controllers/collection/GetCollectionByIdController';
import { makeGetCollectionByIdUseCase } from './makeGetCollectionByIdUseCase';

export function makeGetCollectionByIdController() {
  return new GetCollectionByIdController(makeGetCollectionByIdUseCase());
}
