import { ZodError } from 'zod';

import { CollectionNotFound } from '../application/errors/collection/CollectionNotFound';
import { NameAlreadyInUse } from '../application/errors/collection/NameAlreadyInUse';
import { UserNotFound } from '../application/errors/user/UserNotFound';

export type Errors =
  | ZodError
  | CollectionNotFound
  | NameAlreadyInUse
  | UserNotFound
  | unknown;

export function verifyCollectionErrors(error: Errors) {
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      body: { error: error.errors[0].message },
    };
  }

  if (error instanceof CollectionNotFound) {
    return {
      statusCode: 404,
      body: { error: error.message },
    };
  }

  if (error instanceof NameAlreadyInUse) {
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
  console.log(error);
  return {
    statusCode: 500,
    body: { error: 'Internal Server Error' },
  };
}
