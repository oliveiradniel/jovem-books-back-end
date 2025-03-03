import { UpdateReadUseCase } from '../../application/useCases/read/UpdateReadUseCase';

import { makeGetBookByIdUseCase } from '../book/makeGetBookByIdUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeGetReadByIdUseCase } from './makeGetReadByIdUseCase';
import { makeReadRepository } from './makeReadRepository';

export function makeUpdateReadUseCase() {
  return new UpdateReadUseCase(
    makeReadRepository(),
    makeGetReadByIdUseCase(),
    makeGetBookByIdUseCase(),
    makeGetUserByIdUseCase(),
  );
}
