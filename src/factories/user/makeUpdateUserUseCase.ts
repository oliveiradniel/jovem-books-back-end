import { UpdateUserUseCase } from '../../application/useCases/user/UpdateUserUseCase';

import { makeGetUserByEmailUseCase } from './makeGetUserByEmailUseCase';
import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';
import { makeGetUserByUsernameUseCase } from './makeGetUserByUsernameUseCase';
import { makeUserRepository } from './makeUserRepository';

import { makeDeleteObjectUseCase } from '../s3/makeDeleteObjectUseCase';

export function makeUpdateUserUseCase() {
  return new UpdateUserUseCase(
    makeUserRepository(),
    makeGetUserByIdUseCase(),
    makeGetUserByEmailUseCase(),
    makeGetUserByUsernameUseCase(),
    makeDeleteObjectUseCase(),
  );
}
