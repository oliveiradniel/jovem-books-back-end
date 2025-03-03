import { CreateReadController } from '../../application/controllers/read/CreateReadController';

import { makeCreateReadUseCase } from './makeCreateReadUseCase';

export function makeCreateReadController() {
  return new CreateReadController(makeCreateReadUseCase());
}
