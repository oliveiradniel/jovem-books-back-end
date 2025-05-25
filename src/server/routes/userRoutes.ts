import { Router } from 'express';

import multer from 'multer';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';
import { limiter } from '../middlewares/limiter';

import {
  makeDeleteUserController,
  makeGetUserByIdController,
  makeUpdateUserController,
} from '../../factories/user';

import { makeGenerateUserAvatarUploadURLController } from '../../factories/s3';

const router = Router();

const upload = multer();

router.get(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetUserByIdController()),
);

router.get(
  '/upload-avatar',
  middlewareAdapater(makeAuthenticationMiddleware()),
  limiter,
  routeAdapter(makeGenerateUserAvatarUploadURLController()),
);

router.put(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  upload.single('file'),
  routeAdapter(makeUpdateUserController()),
);

router.delete(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteUserController()),
);

export default router;
