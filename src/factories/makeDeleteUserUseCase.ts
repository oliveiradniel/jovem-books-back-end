import { DeleteUserUseCase } from '../application/useCases/DeleteUserUseCase';

import { makeUserRepository } from './makeUserRepository';

export function makeDeleteUserUseCase() {
  return new DeleteUserUseCase(makeUserRepository());
}
