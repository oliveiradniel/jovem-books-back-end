import { UpdateReadController } from '../../application/controllers/read/UpdateReadController';

import { makeUpdateReadUseCase } from './makeUpdateReadUseCase';

export function makeUpdateReadController() {
  return new UpdateReadController(makeUpdateReadUseCase());
}
