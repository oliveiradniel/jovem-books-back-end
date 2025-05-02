import { SignInUseCase } from '../application/useCases/user/SignInUseCase';

import { makeUserRepository } from './user/makeUserRepository';

export function makeSignInUseCase() {
  return new SignInUseCase(makeUserRepository());
}
