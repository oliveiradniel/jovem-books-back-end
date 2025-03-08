import express from 'express';

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

import multer from 'multer';
import path from 'node:path';

const app = express();

const { PORT } = env;

app.use(express.json());

app.post('/sign-in', routeAdapter(makeSignInController()));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
});

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
