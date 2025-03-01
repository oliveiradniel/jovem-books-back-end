import { CreateUserUseCase } from '../../application/useCases/user/CreateUserUseCase';
import { makeGetUserByEmailUseCase } from './makeGetUserByEmailUseCase';

import { makeGetUserByUsernameUseCase } from './makeGetUserByUsernameUseCase';
import { makeUserRepository } from './makeUserRepository';

export function makeCreateUserUseCase() {
  return new CreateUserUseCase(
    makeUserRepository(),
    makeGetUserByUsernameUseCase(),
    makeGetUserByEmailUseCase(),
  );
}
