import { UpdateBookController } from '../../application/controllers/book/UpdateBookController';

import { makeUpdateBookUseCase } from './makeUpdateBookUseCase';

export function makeUpdateBookController() {
  return new UpdateBookController(makeUpdateBookUseCase());
}
