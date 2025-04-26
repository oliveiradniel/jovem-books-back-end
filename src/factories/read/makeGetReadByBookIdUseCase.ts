import { GetReadByBookIdUseCase } from '../../application/useCases/read/GetReadByBookIdUseCase';

import { makeReadRepository } from './makeReadRepository';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';

export function makeGetReadByBookIdUseCase() {
  return new GetReadByBookIdUseCase(
    makeReadRepository(),
    makeGetBookByIdUseCase(),
  );
}
