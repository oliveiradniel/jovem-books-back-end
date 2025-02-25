import { SignInUseCase } from '../application/useCases/SignInUseCase';

import { makeUserRepository } from './user/makeUserRepository';

export function makeSignInUseCase() {
  return new SignInUseCase(makeUserRepository());
}
