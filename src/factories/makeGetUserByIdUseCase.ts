import { GetUserByIdUseCase } from '../application/useCases/GetUserByIdUseCase';

export function makeGetUserByIdUseCase() {
  return new GetUserByIdUseCase();
}
