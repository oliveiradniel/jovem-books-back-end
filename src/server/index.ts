import express from 'express';

import { env } from '../config/env';

import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import collectionRoutes from './routes/collectionRoutes';
import bookCollectionRoutes from './routes/bookCollectionRoutes';

import { middlewareAdapater } from './adapters/middlewareAdapter';
import { routeAdapter } from './adapters/routeAdapater';

import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddlware';

import { makeSignInController } from '../factories/makeSignInController';
import { makeCreateUserController } from '../factories/user/makeCreateUserController';
import { makeListReadsController } from '../factories/read/makeListReadsController';
import { makeGetReadByIdController } from '../factories/read/makeGetReadByIdController';
import { makeCreateReadController } from '../factories/read/makeCreateReadController';
import { makeUpdateReadController } from '../factories/read/makeUpdateReadController';
import { makeDeleteReadController } from '../factories/read/makeDeleteReadController';

const app = express();

const { PORT } = env;

app.use(express.json());

// Handle authentication user and sign-up

app.post('/sign-in', routeAdapter(makeSignInController()));

app.post('/sign-up', routeAdapter(makeCreateUserController()));

// Handle with users

app.use('/users', userRoutes);

// Handle with Google API Books

app.get(
  '/books/google',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('List books from Google API');
  },
);

app.get(
  '/books/google/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Get book from Google API by id');
  },
);

// Handle with books added by me

app.use('/books', bookRoutes);

// Handle with my collections

app.use('/collections', collectionRoutes);

// Handle with books in my collection

app.use('/book-collection', bookCollectionRoutes);

// Handle with read books

app.get(
  '/reads',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeListReadsController()),
);

app.get(
  '/reads/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetReadByIdController()),
);

app.post(
  '/reads/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateReadController()),
);

app.put(
  '/reads/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateReadController()),
);

app.delete(
  '/reads/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteReadController()),
);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
