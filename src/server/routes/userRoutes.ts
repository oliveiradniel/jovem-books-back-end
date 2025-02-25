import express from 'express';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';
import { makeDeleteUserController } from '../../factories/makeDeleteUserController';
import { makeUpdateUserController } from '../../factories/makeUpdateUserController';
import { makeGetUserByIdController } from '../../factories/makeGetUserByIdController';
import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

const router = express.Router();

router.get(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetUserByIdController()),
);

router.put(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateUserController()),
);

router.delete(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteUserController()),
);

export default router;
