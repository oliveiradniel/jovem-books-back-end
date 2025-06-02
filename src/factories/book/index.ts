import { makeDeleteObjectUseCase } from '../s3/makeDeleteObjectUseCase';
import { makeBookRepository } from './makeBookRepository';
import { makeCreateBookController } from './makeCreateBookController';
import { makeCreateBookUseCase } from './makeCreateBookUseCase';
import { makeDeleteBookController } from './makeDeleteBookController';
import { makeDeleteBookUseCase } from './makeDeleteBookUseCase';
import { makeGetBookByIdController } from './makeGetBookByIdController';
import { makeGetBookByIdUseCase } from './makeGetBookByIdUseCase';
import { makeGetBookByTitleUseCase } from './makeGetBookByTitleUseCase';
import { makeListBooksController } from './makeListBooksController';
import { makeListBooksUseCase } from './makeListBooksUseCase';
import { makeUpdateBookController } from './makeUpdateBookController';
import { makeUpdateBookUseCase } from './makeUpdateBookUseCase';

export {
  makeBookRepository,
  makeCreateBookController,
  makeCreateBookUseCase,
  makeDeleteBookController,
  makeDeleteBookUseCase,
  makeGetBookByIdController,
  makeGetBookByIdUseCase,
  makeGetBookByTitleUseCase,
  makeListBooksController,
  makeListBooksUseCase,
  makeUpdateBookController,
  makeUpdateBookUseCase,
  makeDeleteObjectUseCase,
};
