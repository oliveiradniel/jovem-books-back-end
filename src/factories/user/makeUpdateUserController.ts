import { makeUpdateUserUseCase } from './makeUpdateUserUseCase';

import { UpdateUserController } from '../../application/controllers/user/UpdateUserController';

export function makeUpdateUserController() {
  return new UpdateUserController(makeUpdateUserUseCase());
}
