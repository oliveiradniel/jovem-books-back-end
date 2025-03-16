import { ZodError } from 'zod';

import { UserNotFound } from '../application/errors/user/UserNotFound';

import { IResponse } from '../server/interfaces/IMiddleware';

export type Errors = ZodError | UserNotFound | unknown;

export function verifyGoogleBooksErrors(error: Errors): IResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      body: { message: error.errors[0].message },
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
