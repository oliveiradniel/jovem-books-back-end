import { DeleteUserController } from '../application/controllers/DeleteUserController';
import { makeDeleteUserUseCase } from './makeDeleteUserUseCase';

export function makeDeleteUserController() {
  const deleteUserUseCase = makeDeleteUserUseCase();

  return new DeleteUserController(deleteUserUseCase);
}
