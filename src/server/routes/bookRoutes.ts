import path from 'node:path';

import multer from 'multer';

import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';
import { routeAdapter } from '../adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

import { makeListBooksController } from '../../factories/book/makeListBooksController';
import { makeGetBookByIdController } from '../../factories/book/makeGetBookByIdController';
import { makeCreateBookController } from '../../factories/book/makeCreateBookController';
import { makeUpdateBookController } from '../../factories/book/makeUpdateBookController';
import { makeDeleteBookController } from '../../factories/book/makeDeleteBookController';

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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', '..', 'uploads', 'books'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  '/',
  upload.single('image'),
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateBookController()),
);

router.put(
  '/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateBookController()),
);

router.delete(
  '/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteBookController()),
);

export default router;
