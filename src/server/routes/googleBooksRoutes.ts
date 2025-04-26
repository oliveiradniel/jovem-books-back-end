import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import { makeGetGoogleBooksByTitleController } from '../../factories/google-books/makeGetGoogleBooksByTitleController';
import { makeGetGoogleBooksByAuthorController } from '../../factories/google-books/makeGetGoogleBooksByAuthorController';

const router = Router();

router.get(
  '/title',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetGoogleBooksByTitleController()),
);

router.get(
  '/author',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetGoogleBooksByAuthorController()),
);

export default router;
