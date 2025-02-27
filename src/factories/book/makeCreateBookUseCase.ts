import { CreateBookUseCase } from '../../application/useCases/book/CreateBookUseCase';

import { makeUserRepository } from '../user/makeUserRepository';
import { makeBookRepository } from './makeBookRepository';

export function makeCreateBookUseCase() {
  return new CreateBookUseCase(makeBookRepository(), makeUserRepository());
}
