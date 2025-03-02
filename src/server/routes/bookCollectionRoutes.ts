import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import { makeCreateBookCollectionController } from '../../factories/book-collection/makeCreateBookCollectionController';
import { makeGetBookCollectionByIdController } from '../../factories/book-collection/makeGetBookCollectionByIdController';
import { makeListBooksByCollectionIdController } from '../../factories/book-collection/makeListBooksByCollectionIdController';
import { makeListCollectionsByBookIdController } from '../../factories/book-collection/makeListCollectionsByBookIdController';
import { makeDeleteBookCollectionController } from '../../factories/book-collection/makeDeleteBookCollectionController';

const router = Router();

router.get(
  '/:bookCollectionId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetBookCollectionByIdController()),
);

router.get(
  '/books/:collectionId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeListBooksByCollectionIdController()),
);

router.get(
  '/collections/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeListCollectionsByBookIdController()),
);

router.post(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateBookCollectionController()),
);

router.delete(
  '/bookCollectionId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteBookCollectionController()),
);

export default router;
