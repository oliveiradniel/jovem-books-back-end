import { DeleteUserUseCase } from '../application/useCases/DeleteUserUseCase';
import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';

export function makeDeleteUserUseCase() {
  const getUserByIdUseCase = makeGetUserByIdUseCase();

  return new DeleteUserUseCase(getUserByIdUseCase);
}
