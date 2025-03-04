import { GetGoogleBookByTitleController } from '../../application/controllers/google-books/GetGoogleBookByTitleController';
import { makeGetUserByIdUseCase } from '../user/makeGetUserByIdUseCase';
import { makeGetGoogleBookByTitleUseCase } from './makeGetGoogleBookByTitleUseCase';

export function makeGetGoogleBookByTitleController() {
  return new GetGoogleBookByTitleController(
    makeGetGoogleBookByTitleUseCase(),
    makeGetUserByIdUseCase(),
  );
}
