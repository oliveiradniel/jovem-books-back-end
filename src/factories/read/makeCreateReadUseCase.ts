import { CreateReadUseCase } from '../../application/useCases/read/CreateReadUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeGetReadByIdUseCase } from './makeGetReadByIdUseCase';
import { makeReadRepository } from './makeReadRepository';

export function makeCreateReadUseCase() {
  return new CreateReadUseCase(
    makeReadRepository(),
    makeGetReadByIdUseCase(),
    makeGetBookByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
