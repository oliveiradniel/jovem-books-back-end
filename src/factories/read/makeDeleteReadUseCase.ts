import { DeleteReadUseCase } from '../../application/useCases/read/DeleteReadUseCase';

import { makeReadRepository } from './makeReadRepository';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';

export function makeDeleteReadUseCase() {
  return new DeleteReadUseCase(makeReadRepository(), makeGetBookByIdUseCase());
}
