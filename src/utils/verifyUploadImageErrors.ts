import { ZodError } from 'zod';

import { IResponse } from '../server/interfaces/IMiddleware';

export type Errors = ZodError | unknown;

export function verifyUploadImageErrors(error: Errors): IResponse {
  if (error instanceof ZodError) {
    return {
      statusCode: 400,
      body: { message: error.errors[0].message },
    };
  }

  return {
    statusCode: 500,
    body: { message: 'Internal server error' },
  };
}
