import { GetBookCollectionByIdUseCase } from '../../application/useCases/book-collection/GetBookCollectionByIdUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetCollectionByIdUseCase } from '../collection/makeGetCollectionByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookCollectionRepository } from './makeBookCollectionRepository';

export function makeGetBookCollectionByIdUseCase() {
  return new GetBookCollectionByIdUseCase(
    makeBookCollectionRepository(),
    makeGetBookByIdUseCase(),
    makeGetCollectionByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
