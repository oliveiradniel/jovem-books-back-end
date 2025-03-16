import { ZodError } from 'zod';

import { ReadingAlreadyStarted } from '../application/errors/read/ReadingAlreadyStarted';
import { ReadingNotFound } from '../application/errors/read/ReadingNotFound';

import { IResponse } from '../application/interfaces/IController';

type Errors = ZodError | ReadingAlreadyStarted | ReadingNotFound | unknown;

export function verifyReadErrors(error: Errors): IResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      body: { message: error.errors[0].message },
    };
  }

  if (error instanceof ReadingNotFound) {
    return {
      statusCode: 404,
      body: { message: error.message },
    };
  }

  if (error instanceof ReadingAlreadyStarted) {
    return {
      statusCode: 409,
      body: { message: error.message },
    };
  }

  return {
    statusCode: 500,
    body: { message: 'Internal Server Error' },
  };
}
