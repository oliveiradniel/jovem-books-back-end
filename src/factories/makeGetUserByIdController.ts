import { GetUserByIdController } from '../application/controllers/GetUserByIdController';
import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';

export function makeGetUserByIdController() {
  const getUserByIdUseCase = makeGetUserByIdUseCase();

  return new GetUserByIdController(getUserByIdUseCase);
}
