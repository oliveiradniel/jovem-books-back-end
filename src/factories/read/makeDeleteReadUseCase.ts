import { DeleteReadUseCase } from '../../application/useCases/read/DeleteReadUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeReadRepository } from './makeReadRepository';

export function makeDeleteReadUseCase() {
  return new DeleteReadUseCase(
    makeReadRepository(),
    makeGetBookByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
