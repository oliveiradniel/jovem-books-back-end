import { UpdateReadUseCase } from '../../application/useCases/read/UpdateReadUseCase';

import { makeReadRepository } from './makeReadRepository';

import { makeGetReadByBookIdUseCase } from './makeGetReadByBookIdUseCase';

export function makeUpdateReadUseCase() {
  return new UpdateReadUseCase(
    makeReadRepository(),
    makeGetReadByBookIdUseCase(),
  );
}
