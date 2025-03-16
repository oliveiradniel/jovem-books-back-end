import path from 'node:path';

import express from 'express';

import { cors } from './middlewares/cors';

import { env } from '../config/env';

import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import collectionRoutes from './routes/collectionRoutes';
import bookCollectionRoutes from './routes/bookCollectionRoutes';
import readRoutes from './routes/readRoutes';
import googleBooksRoutes from './routes/googleBooksRoutes';

import { routeAdapter } from './adapters/routeAdapater';

import { makeSignInController } from '../factories/makeSignInController';
import { makeCreateUserController } from '../factories/user/makeCreateUserController';
import { multerConfig } from '../application/lib/multerConfig';

const app = express();

const { PORT } = env;

app.use(cors);
app.use(express.json());

app.use(
  '/uploads/users',
  express.static(path.resolve(__dirname, '..', '..', 'uploads', 'users')),
);

app.use(
  '/uploads/books',
  express.static(path.resolve(__dirname, '..', '..', 'uploads', 'books')),
);

app.post('/sign-in', routeAdapter(makeSignInController()));

const upload = multerConfig({ directory: 'users' });

app.post(
  '/sign-up',
  upload.single('image'),
  routeAdapter(makeCreateUserController()),
);

app.use('/users', userRoutes);

app.use('/google-books', googleBooksRoutes);

app.use('/books', bookRoutes);

app.use('/collections', collectionRoutes);

app.use('/book-collection', bookCollectionRoutes);

app.use('/reads', readRoutes);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
