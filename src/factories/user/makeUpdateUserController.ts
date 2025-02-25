import { makeUpdateUserUseCase } from './makeUpdateUserUseCase';
import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';

import { UpdateUserController } from '../../application/controllers/user/UpdateUserController';

export function makeUpdateUserController() {
  return new UpdateUserController(
    makeUpdateUserUseCase(),
    makeGetUserByIdUseCase(),
  );
}
