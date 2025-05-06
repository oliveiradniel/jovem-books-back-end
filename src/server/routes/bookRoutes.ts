import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import { makeListBooksController } from '../../factories/book/makeListBooksController';
import { makeGetBookByIdController } from '../../factories/book/makeGetBookByIdController';
import { makeCreateBookController } from '../../factories/book/makeCreateBookController';
import { makeUpdateBookController } from '../../factories/book/makeUpdateBookController';
import { makeDeleteBookController } from '../../factories/book/makeDeleteBookController';
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
