import { CreateUserController } from '../application/controllers/CreateUserController';

import { makeCreateUserUseCase } from './makeCreateUserUseCase';

export function makeCreateUserController() {
  return new CreateUserController(makeCreateUserUseCase());
}
