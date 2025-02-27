import { GetBookByIdController } from '../../application/controllers/book/GetBookByIdController';

import { makeGetBookByIdUseCase } from './makeGetBookByIdUseCase';

export function makeGetBookByIdController() {
  return new GetBookByIdController(makeGetBookByIdUseCase());
}
