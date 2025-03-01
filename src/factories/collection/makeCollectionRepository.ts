import { CollectionRepository } from '../../application/repositories/CollectionRepository';

export function makeCollectionRepository() {
  return new CollectionRepository();
}
