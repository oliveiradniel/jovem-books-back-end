import { GetCollectionByIdUseCase } from '../../application/useCases/collection/GetCollectionByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeCollectionRepository } from './makeCollectionRepository';

export function makeGetCollectionByIdUseCase() {
  return new GetCollectionByIdUseCase(
    makeCollectionRepository(),
    makeGetUserByIdUseCase(),
  );
}
