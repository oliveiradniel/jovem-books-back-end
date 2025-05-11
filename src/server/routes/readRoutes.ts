import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import {
  makeCreateReadController,
  makeDeleteReadController,
  makeGetReadByBookIdController,
  makeListReadsController,
  makeUpdateReadController,
} from '../../factories/read';

const router = Router();

router.get(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeListReadsController()),
);

router.get(
  '/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetReadByBookIdController()),
);

router.post(
  '/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateReadController()),
);

router.put(
  '/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateReadController()),
);

router.delete(
  '/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteReadController()),
);

export default router;
