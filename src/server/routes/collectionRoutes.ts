import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import { makeCreateCollectionController } from '../../factories/collection/makeCreateCollectionController';
import { makeListCollectionsController } from '../../factories/collection/makeListCollectionsController';
import { makeGetCollectionByIdController } from '../../factories/collection/makeGetCollectionByIdController';
import { makeUpdateCollectionController } from '../../factories/collection/makeUpdateCollectionController';
import { makeDeleteCollectionController } from '../../factories/collection/makeDeleteCollectionController';

const router = Router();

router.get(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeListCollectionsController()),
);

router.get(
  '/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetCollectionByIdController()),
);

router.post(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateCollectionController()),
);

router.put(
  '/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateCollectionController()),
);

router.delete(
  '/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteCollectionController()),
);

export default router;
