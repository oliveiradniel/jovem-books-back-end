import { ZodError } from 'zod';

import { UserNotFound } from '../application/errors/user/UserNotFound';

import { IResponse } from '../server/interfaces/IMiddleware';

export type Errors = ZodError | UserNotFound | unknown;

export function verifyGoogleBooksErrors(error: Errors): IResponse {
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

  return {
    statusCode: 500,
    body: { error: 'Internal Server Error' },
  };
}
