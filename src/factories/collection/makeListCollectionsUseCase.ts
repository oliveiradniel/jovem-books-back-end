import { ListCollectionsUseCase } from '../../application/useCases/collection/ListCollectionsUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeCollectionRepository } from './makeCollectionRepository';

export function makeListCollectionUseCase() {
  return new ListCollectionsUseCase(
    makeCollectionRepository(),
    makeGetUserByIdUseCase(),
  );
}
