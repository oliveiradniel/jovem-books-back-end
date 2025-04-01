import { CreateReadUseCase } from '../../application/useCases/read/CreateReadUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeGetReadByBookIdUseCase } from './makeGetReadByBookIdUseCase';
import { makeReadRepository } from './makeReadRepository';

export function makeCreateReadUseCase() {
  return new CreateReadUseCase(
    makeReadRepository(),
    makeGetReadByBookIdUseCase(),
    makeGetBookByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
