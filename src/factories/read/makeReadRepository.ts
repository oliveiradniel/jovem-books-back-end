import { ReadRepository } from '../../application/repositories/ReadRepository';

export function makeReadRepository() {
  return new ReadRepository();
}
