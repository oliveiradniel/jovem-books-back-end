import { GetUserByUsernameUseCase } from '../../application/useCases/user/GetUserByUsernameUseCase';

import { makeUserRepository } from './makeUserRepository';

export function makeGetUserByUsernameUseCase() {
  return new GetUserByUsernameUseCase(makeUserRepository());
}
