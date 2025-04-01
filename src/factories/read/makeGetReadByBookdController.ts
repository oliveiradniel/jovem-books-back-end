import { GetReadByBookIdController } from '../../application/controllers/read/GetReadByBookIdController';

import { makeGetReadByBookIdUseCase } from './makeGetReadByBookIdUseCase';

export function makeGetReadByBookIdController() {
  return new GetReadByBookIdController(makeGetReadByBookIdUseCase());
}
