import { ListReadsController } from '../../application/controllers/read/ListReadsController';

import { makeListReadsUseCase } from './makeListReadsUseCase';

export function makeListReadsController() {
  return new ListReadsController(makeListReadsUseCase());
}
