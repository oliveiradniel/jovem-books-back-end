import { ZodError } from 'zod';

import { CollectionNotFound } from '../application/errors/collection/CollectionNotFound';
import { NameAlreadyInUse } from '../application/errors/collection/NameAlreadyInUse';
import { UserNotFound } from '../application/errors/user/UserNotFound';

import { IResponse } from '../server/interfaces/IMiddleware';

export type Errors =
  | ZodError
  | CollectionNotFound
  | NameAlreadyInUse
  | UserNotFound
  | unknown;

export function verifyCollectionErrors(error: Errors): IResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      body: { message: error.errors[0].message },
    };
  }

  if (error instanceof CollectionNotFound) {
    return {
      statusCode: 404,
      body: { message: error.message },
    };
  }

  if (error instanceof NameAlreadyInUse) {
    return {
      statusCode: 409,
      body: { message: error.message },
    };
  }

  if (error instanceof UserNotFound) {
    return {
      statusCode: 404,
      body: { message: error.message },
    };
  }

  return {
    statusCode: 500,
    body: { message: 'Internal Server Error' },
  };
}
