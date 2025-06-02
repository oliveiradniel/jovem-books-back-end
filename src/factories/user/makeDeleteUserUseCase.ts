import { DeleteUserUseCase } from '../../application/useCases/user/DeleteUserUseCase';

import { makeUserRepository } from './makeUserRepository';
import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';
import { makeDeleteObjectUseCase } from '../book';

export function makeDeleteUserUseCase() {
  return new DeleteUserUseCase(
    makeUserRepository(),
    makeGetUserByIdUseCase(),
    makeDeleteObjectUseCase(),
  );
}
