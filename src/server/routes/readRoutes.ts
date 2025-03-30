import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import { makeGetReadByIdController } from '../../factories/read/makeGetReadByIdController';
import { makeCreateReadController } from '../../factories/read/makeCreateReadController';
import { makeUpdateReadController } from '../../factories/read/makeUpdateReadController';
import { makeDeleteReadController } from '../../factories/read/makeDeleteReadController';

const router = Router();

router.get(
  '/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetReadByIdController()),
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
