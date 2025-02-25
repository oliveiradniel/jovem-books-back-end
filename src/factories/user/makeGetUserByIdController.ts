import { GetUserByIdController } from '../../application/controllers/user/GetUserByIdController';

import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';

export function makeGetUserByIdController() {
  return new GetUserByIdController(makeGetUserByIdUseCase());
}
