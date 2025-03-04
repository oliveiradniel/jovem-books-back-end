import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import { makeGetGoogleBookByTitleController } from '../../factories/google-books/makeGetGoogleBookByTitleController';
import { makeGetGoogleBookByAuthorController } from '../../factories/google-books/makeGetGoogleBookByAuthorController';

const router = Router();

router.get(
  '/title',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetGoogleBookByTitleController()),
);

router.get(
  '/author',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetGoogleBookByAuthorController()),
);

export default router;
