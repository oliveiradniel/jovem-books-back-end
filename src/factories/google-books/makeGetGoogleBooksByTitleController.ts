import { GetGoogleBooksByTitleController } from '../../application/controllers/google-books/GetGoogleBookByTitleController';

import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeGetGoogleBooksByTitleUseCase } from './makeGetGoogleBooksByTitleUseCase';

export function makeGetGoogleBooksByTitleController() {
  return new GetGoogleBooksByTitleController(
    makeGetGoogleBooksByTitleUseCase(),
    makeGetUserByIdUseCase(),
  );
}
