import { ListReadsUseCase } from '../../application/useCases/read/ListReadsUseCase';
import { makeGetUserByIdUseCase } from '../user';

import { makeReadRepository } from './makeReadRepository';

export function makeListReadsUseCase() {
  return new ListReadsUseCase(makeReadRepository(), makeGetUserByIdUseCase());
}
