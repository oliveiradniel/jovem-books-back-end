import { SignInControler } from '../application/controllers/SignInController';

import { makeSignInUseCase } from './makeSignInUseCase';

export function makeSignInController() {
  return new SignInControler(makeSignInUseCase());
}
