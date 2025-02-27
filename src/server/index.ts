import express from 'express';

import { env } from '../config/env';

import userRoutes from './routes/userRoutes';

import { routeAdapter } from './adapters/routeAdapater';

import { makeSignInController } from '../factories/makeSignInController';
import { makeCreateUserController } from '../factories/user/makeCreateUserController';

import { middlewareAdapater } from './adapters/middlewareAdapter';

import { makeAuthenticationMiddleware } from '../factories/makeAuthenticationMiddlware';

import { makeListBooksController } from '../factories/book/makeListBooksController';
import { makeCreateBookController } from '../factories/book/makeCreateBookController';
import { makeUpdateBookController } from '../factories/book/makeUpdateBookController';
import { makeGetBookByIdController } from '../factories/book/makeGetBookByIdController';
import { makeDeleteBookController } from '../factories/book/makeDeleteBookController';

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

app.get(
  '/books',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeListBooksController()),
);

app.get(
  '/books/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeGetBookByIdController()),
);

app.post(
  '/books',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeCreateBookController()),
);

app.put(
  '/books/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdateBookController()),
);

app.delete(
  '/books/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  routeAdapter(makeDeleteBookController()),
);

// Handle with my collections

app.get(
  '/collections',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('list all collections');
  },
);

app.get(
  '/collections/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Get collection by id');
  },
);

app.post(
  '/collections',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Add collection');
  },
);

app.put(
  '/collections/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Edit collection');
  },
);

app.delete(
  '/collections/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Delete collection');
  },
);

// Handle with books in my collection

app.get(
  '/collections/:collectionId/books',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('List books from my collection by id');
  },
);

app.post(
  '/collections/books/:bookId',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Add book for my collection');
  },
);

app.put(
  '/collections/:collectionId/books',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Edit book and information of collection');
  },
);

app.delete(
  '/collections/:collectionId/books',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Delete book from my collection');
  },
);

// Handle with read books

app.get(
  '/reads',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('List all reads');
  },
);

app.get(
  '/reads/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Get read by id');
  },
);

app.post(
  '/reads',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Add read');
  },
);

app.put(
  '/reads/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Edit read');
  },
);

app.delete(
  '/reads/:id',
  middlewareAdapater(makeAuthenticationMiddleware()),
  (request, response) => {
    response.send('Delete read');
  },
);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
