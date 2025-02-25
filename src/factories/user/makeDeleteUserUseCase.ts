import { DeleteUserUseCase } from '../../application/useCases/user/DeleteUserUseCase';

import { makeUserRepository } from './makeUserRepository';

export function makeDeleteUserUseCase() {
  return new DeleteUserUseCase(makeUserRepository());
}
