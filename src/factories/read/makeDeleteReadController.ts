import { DeleteReadController } from '../../application/controllers/read/DeleteReadController';

import { makeDeleteReadUseCase } from './makeDeleteReadUseCase';

export function makeDeleteReadController() {
  return new DeleteReadController(makeDeleteReadUseCase());
}
