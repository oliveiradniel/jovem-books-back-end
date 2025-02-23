import express from 'express';

import { env } from '../config/env';

import { SignUpController } from '../application/controllers/SignUpController';
import { SignInControler } from '../application/controllers/SignInController';

import { SignInUseCase } from '../application/useCases/SignInUseCase';
import { SignUpUseCase } from '../application/useCases/SignUpUseCase';

const app = express();

const { PORT } = env;

app.use(express.json());

// Handle authentication user and sign-up

app.post('/sign-in', async (request, response) => {
  const signInUseCase = new SignInUseCase();
  const signInController = new SignInControler(signInUseCase);

  const { statusCode, body } = await signInController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

app.post('/sign-up', async (request, response) => {
  const signUpUseCase = new SignUpUseCase();
  const signUpController = new SignUpController(signUpUseCase);

  const { statusCode, body } = await signUpController.handle({
    body: request.body,
  });

  response.status(statusCode).json(body);
});

// Handle with users

app.get('/users/:id', (request, response) => {
  response.send('Get user by id');
});

app.put('/users/:id', (request, response) => {
  response.send('Edit user by id');
});

app.delete('/users/:id', (request, response) => {
  response.send('Delete user by id');
});

// Handle with Google API Books

app.get('/books/google', (request, response) => {
  response.send('List books from Google API');
});

app.get('/books/google/:id', (request, response) => {
  response.send('Get book from Google API by id');
});

// Handle with books added by me

app.get('/books', (request, response) => {
  response.send('List my books');
});

app.get('/books/:id', (request, response) => {
  response.send('Get my book by id');
});

app.post('/books', (request, response) => {
  response.send('Add book');
});

app.put('/books/:id', (request, response) => {
  response.send('Edit book');
});

app.delete('/books/:id', (request, response) => {
  response.send('Delete book');
});

// Handle with my collections

app.get('/collections', (request, response) => {
  response.send('list all collections');
});

app.get('/collections/:id', (request, response) => {
  response.send('Get collection by id');
});

app.post('/collections', (request, response) => {
  response.send('Add collection');
});

app.put('/collections/:id', (request, response) => {
  response.send('Edit collection');
});

app.delete('/collections/:id', (request, response) => {
  response.send('Delete collection');
});

// Handle with books in my collection

app.get('/collections/:collectionId/books', (request, response) => {
  response.send('List books from my collection by id');
});

app.post('/collections/books/:bookId', (request, response) => {
  response.send('Add book for my collection');
});

app.put('/collections/:collectionId/books', (request, response) => {
  response.send('Edit book and information of collection');
});

app.delete('/collections/:collectionId/books', (request, response) => {
  response.send('Delete book from my collection');
});

// Handle with read books

app.get('/reads', (request, response) => {
  response.send('List all reads');
});

app.get('/reads/:id', (request, response) => {
  response.send('Get read by id');
});

app.post('/reads', (request, response) => {
  response.send('Add read');
});

app.put('/reads/:id', (request, response) => {
  response.send('Edit read');
});

app.delete('/reads/:id', (request, response) => {
  response.send('Delete read');
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
