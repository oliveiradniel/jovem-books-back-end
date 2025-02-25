import { DeleteUserController } from '../../application/controllers/user/DeleteUserController';

import { makeDeleteUserUseCase } from './makeDeleteUserUseCase';

export function makeDeleteUserController() {
  return new DeleteUserController(makeDeleteUserUseCase());
}
