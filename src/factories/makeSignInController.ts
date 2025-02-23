import { SignInControler } from '../application/controllers/SignInController';
import { makeSignInUseCase } from './makeSignInUseCase';

export function makeSignInController() {
  const signInUseCase = makeSignInUseCase();

  return new SignInControler(signInUseCase);
}
