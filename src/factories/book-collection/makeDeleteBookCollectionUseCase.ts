import { DeleteBookCollectionUseCase } from '../../application/useCases/book-collection/DeleteBookCollectionUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetCollectionByIdUseCase } from '../collection/makeGetCollectionByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookCollectionRepository } from './makeBookCollectionRepository';

export function makeDeleteBookCollectionUseCase() {
  return new DeleteBookCollectionUseCase(
    makeBookCollectionRepository(),
    makeGetBookByIdUseCase(),
    makeGetCollectionByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
