import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import {
  makeDeleteUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from '../../factories/user';

import {
  makeDeleteUserAvatarFromS3Controller,
  makeGenerateUserAvatarUploadURLController,
} from '../../factories/s3';

import { multerConfig } from '../../application/lib/multerConfig';

const router = Router();

const upload = multerConfig({ directory: 'users' });

router.get(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetUserByIdController()),
);

router.get(
  '/upload-avatar',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGenerateUserAvatarUploadURLController()),
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

router.delete(
  '/avatar/:key',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteUserAvatarFromS3Controller()),
);

export default router;
