import { GetReadByBookIdUseCase } from '../../application/useCases/read/GetReadByBookIdUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeReadRepository } from './makeReadRepository';

export function makeGetReadByBookIdUseCase() {
  return new GetReadByBookIdUseCase(
    makeReadRepository(),
    makeGetBookByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
