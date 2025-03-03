import { ZodError } from 'zod';

import { BookNotFound } from '../application/errors/book/BookNotFound';
import { CollectionNotFound } from '../application/errors/collection/CollectionNotFound';
import { UserNotFound } from '../application/errors/user/UserNotFound';
import { BookCollectionNotFound } from '../application/errors/book-collection/BookCollectionNotFound';

import { IResponse } from '../server/interfaces/IMiddleware';

type Errors =
  | ZodError
  | BookNotFound
  | CollectionNotFound
  | UserNotFound
  | BookCollectionNotFound
  | unknown;

export function verifyBookCollectionErrors(error: Errors): IResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      body: { error: error.errors[0].message },
    };
  }

  if (error instanceof UserNotFound) {
    return {
      statusCode: 404,
      body: { error: error.message },
    };
  }

  if (error instanceof BookNotFound) {
    return {
      statusCode: 404,
      body: { error: error.message },
    };
  }

  if (error instanceof CollectionNotFound) {
    return {
      statusCode: 404,
      body: { error: error.message },
    };
  }

  if (error instanceof BookCollectionNotFound) {
    return {
      statusCode: 404,
      body: { error: error.message },
    };
  }
  // console.log(error);
  return {
    statusCode: 500,
    body: { error: 'Server Internal Error' },
  };
}
