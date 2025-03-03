import { GetReadByIdController } from '../../application/controllers/read/GetReadByIdController';

import { makeGetReadByIdUseCase } from './makeGetReadByIdUseCase';

export function makeGetReadByIdController() {
  return new GetReadByIdController(makeGetReadByIdUseCase());
}
