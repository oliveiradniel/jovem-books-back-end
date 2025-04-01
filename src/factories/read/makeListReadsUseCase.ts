import { ListReadsUseCase } from '../../application/useCases/read/ListReadsUseCase';

import { makeReadRepository } from './makeReadRepository';

export function makeListReadsUseCase() {
  return new ListReadsUseCase(makeReadRepository());
}
