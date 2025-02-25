import { GetUserByIdUseCase } from '../../application/useCases/user/GetUserByIdUseCase';

import { makeUserRepository } from './makeUserRepository';

export function makeGetUserByIdUseCase() {
  return new GetUserByIdUseCase(makeUserRepository());
}
