import { DeleteUserController } from '../application/controllers/DeleteUserController';
import { makeDeleteUserUseCase } from './makeDeleteUserUseCase';

export function makeDeleteUserController() {
  return new DeleteUserController(makeDeleteUserUseCase());
}
