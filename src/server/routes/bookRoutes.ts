import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import {
  makeCreateBookController,
  makeDeleteBookController,
  makeGetBookByIdController,
  makeListBooksController,
  makeUpdateBookController,
} from '../../factories/book';

import { multerConfig } from '../../application/lib/multerConfig';

const router = Router();

router.get(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeListBooksController()),
);

router.get(
  '/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetBookByIdController()),
);

const upload = multerConfig({ directory: 'books' });

router.post(
  '/',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateBookController()),
);

router.put(
  '/:id',
  upload.single('image'),
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateBookController()),
);

router.delete(
  '/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteBookController()),
);

export default router;
