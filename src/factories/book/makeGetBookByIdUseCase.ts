import { GetBookByIdUseCase } from '../../application/useCases/book/GetBookByIdUseCase';
import { makeUserRepository } from '../user/makeUserRepository';
import { makeBookRepository } from './makeBookRepository';

export function makeGetBookByIdUseCase() {
  return new GetBookByIdUseCase(makeBookRepository(), makeUserRepository());
}
