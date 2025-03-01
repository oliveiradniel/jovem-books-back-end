import { DeleteCollectionUseCase } from '../../application/useCases/collection/DeleteCollectionUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeCollectionRepository } from './makeCollectionRepository';
import { makeGetCollectionByIdUseCase } from './makeGetCollectionByIdUseCase';

export function makeDeleteCollectionUseCase() {
  return new DeleteCollectionUseCase(
    makeCollectionRepository(),
    makeGetCollectionByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
