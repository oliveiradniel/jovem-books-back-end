import { GetUserByIdController } from '../application/controllers/GetUserByIdController';
import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';

export function makeGetUserByIdController() {
  return new GetUserByIdController(makeGetUserByIdUseCase());
}
