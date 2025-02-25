import { makeUpdateUserUseCase } from './makeUpdateUserUseCase';
import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';

import { UpdateUserController } from '../application/controllers/UpdateUserController';

export function makeUpdateUserController() {
  const updateUserUseCase = makeUpdateUserUseCase();
  const getUserByIdUseCase = makeGetUserByIdUseCase();

  return new UpdateUserController(updateUserUseCase, getUserByIdUseCase);
}
