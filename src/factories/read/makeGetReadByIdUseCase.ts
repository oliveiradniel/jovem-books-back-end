import { GetReadByIdUseCase } from '../../application/useCases/read/GetReadByBookIdUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeReadRepository } from './makeReadRepository';

export function makeGetReadByIdUseCase() {
  return new GetReadByIdUseCase(
    makeReadRepository(),
    makeGetBookByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
