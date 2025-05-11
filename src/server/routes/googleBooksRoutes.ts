import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import {
  makeGetGoogleBooksByAuthorController,
  makeGetGoogleBooksByTitleController,
} from '../../factories/google-books';

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
