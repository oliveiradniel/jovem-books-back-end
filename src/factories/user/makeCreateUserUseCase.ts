import { CreateUserUseCase } from '../../application/useCases/user/CreateUserUseCase';

import { makeUserRepository } from './makeUserRepository';

export function makeCreateUserUseCase() {
  return new CreateUserUseCase(makeUserRepository());
}
