import { UserRepository } from '../application/repositories/UserRepository';

export function makeUserRepository() {
  return new UserRepository();
}
