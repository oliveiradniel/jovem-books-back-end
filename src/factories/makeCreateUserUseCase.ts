import { CreateUserUseCase } from '../application/useCases/CreateUserUseCase';

import { makeUserRepository } from './makeUserRepository';

export function makeCreateUserUseCase() {
  return new CreateUserUseCase(makeUserRepository());
}
