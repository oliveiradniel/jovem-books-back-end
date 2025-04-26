import { CreateReadUseCase } from '../../application/useCases/read/CreateReadUseCase';

import { makeReadRepository } from './makeReadRepository';

import { makeGetReadByBookIdUseCase } from './makeGetReadByBookIdUseCase';

export function makeCreateReadUseCase() {
  return new CreateReadUseCase(
    makeReadRepository(),
    makeGetReadByBookIdUseCase(),
  );
}
