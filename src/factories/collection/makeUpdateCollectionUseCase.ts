import { UpdateCollectionUseCase } from '../../application/useCases/collection/UpdateCollectionUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeCollectionRepository } from './makeCollectionRepository';
import { makeGetCollectionByIdUseCase } from './makeGetCollectionByIdUseCase';
import { makeGetCollectionByNameUseCase } from './makeGetCollectionByNameUseCase';

export function makeUpdateCollectionUseCase() {
  return new UpdateCollectionUseCase(
    makeCollectionRepository(),
    makeGetCollectionByIdUseCase(),
    makeGetCollectionByNameUseCase(),
    makeGetUserByIdUseCase(),
  );
}
