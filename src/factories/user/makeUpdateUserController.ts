import { makeUpdateUserUseCase } from './makeUpdateUserUseCase';

import { UpdateUserController } from '../../application/controllers/user/UpdateUserController';
import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';

export function makeUpdateUserController() {
  return new UpdateUserController(
    makeUpdateUserUseCase(),
    makeGetUserByIdUseCase(),
  );
}
