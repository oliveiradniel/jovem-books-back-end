import { UpdateUserUseCase } from '../../application/useCases/user/UpdateUserUseCase';

import { makeUserRepository } from './makeUserRepository';

export function makeUpdateUserUseCase() {
  return new UpdateUserUseCase(makeUserRepository());
}
