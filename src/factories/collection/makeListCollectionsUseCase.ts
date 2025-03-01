import { ListCollectionsUseCase } from '../../application/useCases/collection/ListCollectionsUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeCollectionRepository } from './makeCollectionRepository';

export function makeListCollectionsUseCase() {
  return new ListCollectionsUseCase(
    makeCollectionRepository(),
    makeGetUserByIdUseCase(),
  );
}
