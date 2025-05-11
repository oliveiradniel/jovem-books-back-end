import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import {
  makeDeleteUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from '../../factories/user';

import { multerConfig } from '../../application/lib/multerConfig';

const router = Router();

const upload = multerConfig({ directory: 'users' });

router.get(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetUserByIdController()),
);

router.put(
  '/',
  upload.single('image'),
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateUserController()),
);

router.delete(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteUserController()),
);

export default router;
