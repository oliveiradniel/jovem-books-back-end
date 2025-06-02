import { DeleteUserUseCase } from '../../application/useCases/user/DeleteUserUseCase';

import { makeUserRepository } from './makeUserRepository';
import { makeGetUserByIdUseCase } from './makeGetUserByIdUseCase';
import { makeDeleteObjectUseCase, makeListBooksUseCase } from '../book';
import { makeDeleteObjectsUseCase } from '../s3/makeDeleteObjectsUseCase';

export function makeDeleteUserUseCase() {
  return new DeleteUserUseCase(
    makeUserRepository(),
    makeGetUserByIdUseCase(),
    makeListBooksUseCase(),
    makeDeleteObjectUseCase(),
    makeDeleteObjectsUseCase(),
  );
}
