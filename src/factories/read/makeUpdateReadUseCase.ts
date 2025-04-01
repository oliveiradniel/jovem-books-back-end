import { UpdateReadUseCase } from '../../application/useCases/read/UpdateReadUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeGetReadByBookIdUseCase } from './makeGetReadByBookIdUseCase';
import { makeReadRepository } from './makeReadRepository';

export function makeUpdateReadUseCase() {
  return new UpdateReadUseCase(
    makeReadRepository(),
    makeGetReadByBookIdUseCase(),
    makeGetBookByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
