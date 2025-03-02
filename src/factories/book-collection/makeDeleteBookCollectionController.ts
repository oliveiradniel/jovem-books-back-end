import { DeleteBookCollectionController } from '../../application/controllers/book-collection/DeleteBookCollectionController';
import { makeDeleteBookCollectionUseCase } from './makeDeleteBookCollectionUseCase';

export function makeDeleteBookCollectionController() {
  return new DeleteBookCollectionController(makeDeleteBookCollectionUseCase());
}
