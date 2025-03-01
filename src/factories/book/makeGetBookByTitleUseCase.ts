import { GetBookByTitleUseCase } from '../../application/useCases/book/GetBookByTitleUseCase';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeBookRepository } from './makeBookRepository';

export function makeGetBookByTitleUseCase() {
  return new GetBookByTitleUseCase(
    makeBookRepository(),
    makeGetUserByIdUseCase(),
  );
}
