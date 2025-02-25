import { UpdateUserUseCase } from '../application/useCases/UpdateUserUseCase';

import { makeUserRepository } from './makeUserRepository';

export function makeUpdateUserUseCase() {
  return new UpdateUserUseCase(makeUserRepository());
}
