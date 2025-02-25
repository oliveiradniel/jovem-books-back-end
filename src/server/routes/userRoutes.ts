import express from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import { makeDeleteUserController } from '../../factories/user/makeDeleteUserController';
import { makeUpdateUserController } from '../../factories/user/makeUpdateUserController';
import { makeGetUserByIdController } from '../../factories/user/makeGetUserByIdController';

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
