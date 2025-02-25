import { CreateUserController } from '../../application/controllers/user/CreateUserController';

import { makeCreateUserUseCase } from './makeCreateUserUseCase';

export function makeCreateUserController() {
  return new CreateUserController(makeCreateUserUseCase());
}
