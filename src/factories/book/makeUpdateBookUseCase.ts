import { UpdateBookUseCase } from '../../application/useCases/book/UpdateBookUseCase';
import { makeUserRepository } from '../user/makeUserRepository';
import { makeBookRepository } from './makeBookRepository';

export function makeUpdateBookUseCase() {
  return new UpdateBookUseCase(makeBookRepository(), makeUserRepository());
}
