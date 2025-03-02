import { ListBooksByCollectionIdUseCase } from '../../application/useCases/book-collection/ListBooksByCollectionIdUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetCollectionByIdUseCase } from '../collection/makeGetCollectionByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookCollectionRepository } from './makeBookCollectionRepository';

export function makeListBooksByCollectionIdUseCase() {
  return new ListBooksByCollectionIdUseCase(
    makeBookCollectionRepository(),
    makeGetBookByIdUseCase(),
    makeGetCollectionByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
