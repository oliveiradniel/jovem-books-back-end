import { ListReadsUseCase } from '../../application/useCases/read/ListReadsUseCase';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeReadRepository } from './makeReadRepository';

export function makeListReadsUseCase() {
  return new ListReadsUseCase(makeReadRepository(), makeGetUserByIdUseCase());
}
