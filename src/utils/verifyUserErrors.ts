import { ZodError } from 'zod';

import { EmailAlreadyInUse } from '../application/errors/user/EmailAlreadyInUse';
import { InvalidCredentials } from '../application/errors/user/InvalidCredentials';
import { UsernameAlreadyInUse } from '../application/errors/user/UsernameAlreadyInUse';
import { UserNotFound } from '../application/errors/user/UserNotFound';

import { IResponse } from '../server/interfaces/IMiddleware';

export type Errors =
  | ZodError
  | EmailAlreadyInUse
  | InvalidCredentials
  | UsernameAlreadyInUse
  | UserNotFound
  | unknown;

export function verifyUserErrors(error: Errors): IResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      body: { error: error.errors[0].message },
    };
  }

  if (error instanceof EmailAlreadyInUse) {
    return {
      statusCode: 409,
      body: { error: error.message },
    };
  }

  if (error instanceof InvalidCredentials) {
    return {
      statusCode: 409,
      body: { error: error.message },
    };
  }

  if (error instanceof UsernameAlreadyInUse) {
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
    body: { error: 'Internal server error' },
  };
}
