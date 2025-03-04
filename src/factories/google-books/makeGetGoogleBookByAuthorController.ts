import { GetGoogleBookByAuthorController } from '../../application/controllers/google-books/GetGoogleBookByAuthorController';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeGetGoogleBookByAuthorUseCase } from './makeGetGoogleBookByAuthorUseCase';

export function makeGetGoogleBookByAuthorController() {
  return new GetGoogleBookByAuthorController(
    makeGetGoogleBookByAuthorUseCase(),
    makeGetUserByIdUseCase(),
  );
}
