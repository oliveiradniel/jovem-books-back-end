import { EditUserUseCase } from '../application/useCases/EditUserUseCase';
import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';

export function makeEditUserUseCase() {
  const getUserByIdUseCase = makeGetUserByIdUseCase();

  return new EditUserUseCase(getUserByIdUseCase);
}
