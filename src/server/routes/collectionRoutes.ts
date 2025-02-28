import { Router } from 'express';

import { middlewareAdapater } from '../adapters/middlewareAdapter';

import { makeAuthenticationMiddleware } from '../../factories/makeAuthenticationMiddlware';

const router = Router();

router.get(
  '/collections',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('list all collections');
  },
);

router.get(
  '/collections/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Get collection by id');
  },
);

router.post(
  '/collections',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Add collection');
  },
);

router.put(
  '/collections/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Edit collection');
  },
);

router.delete(
  '/collections/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Delete collection');
  },
);

export default router;
