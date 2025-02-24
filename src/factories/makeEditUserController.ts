import { EditUserController } from '../application/controllers/EditUserController';
import { makeEditUserUseCase } from './makeEditUserUseCase';
import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';

export function makeEditUserController() {
  const editUserUseCase = makeEditUserUseCase();
  const getUserByIdUseCase = makeGetUserByIdUseCase();

  return new EditUserController(editUserUseCase, getUserByIdUseCase);
}
