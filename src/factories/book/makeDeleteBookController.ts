import { DeleteBookController } from '../../application/controllers/book/DeleteBookController';
import { makeDeleteBookUseCase } from './makeDeleteBookUseCase';

export function makeDeleteBookController() {
  return new DeleteBookController(makeDeleteBookUseCase());
}
