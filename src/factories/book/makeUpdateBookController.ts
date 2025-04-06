import { UpdateBookController } from '../../application/controllers/book/UpdateBookController';

import { makeGetBookByIdUseCase } from './makeGetBookByIdUseCase';
import { makeUpdateBookUseCase } from './makeUpdateBookUseCase';

export function makeUpdateBookController() {
  return new UpdateBookController(
    makeUpdateBookUseCase(),
    makeGetBookByIdUseCase(),
  );
}
