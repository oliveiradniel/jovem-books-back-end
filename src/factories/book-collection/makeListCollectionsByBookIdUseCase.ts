import { ListCollectionsByBookIdUseCase } from '../../application/useCases/book-collection/ListCollectionsByBookIdUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookCollectionRepository } from './makeBookCollectionRepository';

export function makeListCollectionsByBookIdUseCase() {
  return new ListCollectionsByBookIdUseCase(
    makeBookCollectionRepository(),
    makeGetBookByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
