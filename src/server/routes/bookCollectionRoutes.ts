import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

const router = Router();

router.get(
  '/books/:collectionId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('List books from my collection by id');
  },
);

router.get(
  '/collections/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('List collections from my book by id');
  },
);

router.post(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Add book for my collection');
  },
);

router.delete(
  '/:bookCollectionId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Delete book from my collection');
  },
);

export default router;
