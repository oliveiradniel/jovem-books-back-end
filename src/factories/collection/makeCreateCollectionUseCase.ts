import { CreateCollectionUseCase } from '../../application/useCases/collection/CreateCollectionUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeCollectionRepository } from './makeCollectionRepository';
import { makeGetCollectionByNameUseCase } from './makeGetCollectionByNameUseCase';

export function makeCreateCollectionUseCase() {
  return new CreateCollectionUseCase(
    makeCollectionRepository(),
    makeGetCollectionByNameUseCase(),
    makeGetUserByIdUseCase(),
  );
}
