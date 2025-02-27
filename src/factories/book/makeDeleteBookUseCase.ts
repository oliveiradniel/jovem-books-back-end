import { DeleteBookUseCase } from '../../application/useCases/book/DeleteBookUseCase';
import { makeUserRepository } from '../user/makeUserRepository';
import { makeBookRepository } from './makeBookRepository';

export function makeDeleteBookUseCase() {
  return new DeleteBookUseCase(makeBookRepository(), makeUserRepository());
}
