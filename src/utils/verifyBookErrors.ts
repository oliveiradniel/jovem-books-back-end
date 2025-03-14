import { ZodError } from 'zod';

import { BookNotFound } from '../application/errors/book/BookNotFound';
import { TitleAlreadyInUse } from '../application/errors/book/TitleAlreadyInUse';
import { UserNotFound } from '../application/errors/user/UserNotFound';

import { IResponse } from '../server/interfaces/IMiddleware';

export type Errors =
  | ZodError
  | BookNotFound
  | TitleAlreadyInUse
  | UserNotFound
  | unknown;

export function verifyBookErrors(error: Errors): IResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      body: { error: error.errors[0].message },
    };
  }

  if (error instanceof BookNotFound) {
    return {
      statusCode: 404,
      body: { error: error.message },
    };
  }

  if (error instanceof TitleAlreadyInUse) {
    return {
      statusCode: 409,
      body: { error: error.message },
    };
  }

  if (error instanceof UserNotFound) {
    return {
      statusCode: 404,
      body: { error: error.message },
    };
  }
  return {
    statusCode: 500,
    body: { error: 'Internal server error' },
  };
}
