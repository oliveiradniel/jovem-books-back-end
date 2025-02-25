import { GetUserByIdUseCase } from '../application/useCases/GetUserByIdUseCase';

import { makeUserRepository } from './makeUserRepository';

export function makeGetUserByIdUseCase() {
  return new GetUserByIdUseCase(makeUserRepository());
}
