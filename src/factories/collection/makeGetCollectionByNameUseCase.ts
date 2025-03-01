import { GetCollectionByNameUseCase } from '../../application/useCases/collection/GetCollectionByNameUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeCollectionRepository } from './makeCollectionRepository';

export function makeGetCollectionByNameUseCase() {
  return new GetCollectionByNameUseCase(
    makeCollectionRepository(),
    makeGetUserByIdUseCase(),
  );
}
