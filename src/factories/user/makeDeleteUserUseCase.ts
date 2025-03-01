import { DeleteUserUseCase } from '../../application/useCases/user/DeleteUserUseCase';

import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';
import { makeUserRepository } from './makeUserRepository';

export function makeDeleteUserUseCase() {
  return new DeleteUserUseCase(makeUserRepository(), makeGetUserByIdUseCase());
}
