import { GetGoogleBooksByAuthorController } from '../../application/controllers/google-books/GetGoogleBooksByAuthorController';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeGetGoogleBooksByAuthorUseCase } from './makeGetGoogleBooksByAuthorUseCase';

export function makeGetGoogleBooksByAuthorController() {
  return new GetGoogleBooksByAuthorController(
    makeGetGoogleBooksByAuthorUseCase(),
    makeGetUserByIdUseCase(),
  );
}
