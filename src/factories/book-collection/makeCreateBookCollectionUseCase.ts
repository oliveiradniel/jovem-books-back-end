import { CreateBookCollectionUseCase } from '../../application/useCases/book-collection/CreateBookCollectionUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetCollectionByIdUseCase } from '../collection/makeGetCollectionByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookCollectionRepository } from './makeBookCollectionRepository';

export function makeCreateBookCollectionUseCase() {
  return new CreateBookCollectionUseCase(
    makeBookCollectionRepository(),
    makeGetBookByIdUseCase(),
    makeGetCollectionByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
