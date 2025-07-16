import express from 'express';

import { cors } from './middlewares/cors';

import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import collectionRoutes from './routes/collectionRoutes';
import bookCollectionRoutes from './routes/bookCollectionRoutes';
import readRoutes from './routes/readRoutes';
import googleBooksRoutes from './routes/googleBooksRoutes';

import { routeAdapter } from './adapters/routeAdapater';

import { makeSignInController } from '../factories/makeSignInController';
import { makeCreateUserController } from '../factories/user/makeCreateUserController';

const app = express();

const PORT = process.env.PORT || '3001';

app.use(cors);
app.use(express.json());

app.post('/sign-in', routeAdapter(makeSignInController()));

app.post('/sign-up', routeAdapter(makeCreateUserController()));

app.use('/users', userRoutes);

app.use('/google-books', googleBooksRoutes);

app.use('/books', bookRoutes);

app.use('/collections', collectionRoutes);

app.use('/book-collection', bookCollectionRoutes);

app.use('/reads', readRoutes);

// app.listen(+PORT, '0.0.0.0', () => {
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
