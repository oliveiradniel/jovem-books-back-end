import { GetUserByEmailUseCase } from '../../application/useCases/user/GetUserByEmailUseCase';

import { makeUserRepository } from './makeUserRepository';

export function makeGetUserByEmailUseCase() {
  return new GetUserByEmailUseCase(makeUserRepository());
}
