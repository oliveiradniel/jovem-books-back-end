import { UpdateUserUseCase } from '../../application/useCases/user/UpdateUserUseCase';

import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';
import { makeUserRepository } from './makeUserRepository';

export function makeUpdateUserUseCase() {
  return new UpdateUserUseCase(makeUserRepository(), makeGetUserByIdUseCase());
}
