import { CreateBookController } from '../../application/controllers/book/CreateBookController';

import { makeCreateBookUseCase } from './makeCreateBookUseCase';

export function makeCreateBookController() {
  return new CreateBookController(makeCreateBookUseCase());
}
