import { NextFunction, Request, Response } from 'express';

import { IMiddleware } from '../interfaces/IMiddleware';

export function middlewareAdapater(middleware: IMiddleware) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const result = await middleware.handle({
      headers: request.headers as Record<string, string>,
    });

    if ('statusCode' in result) {
      const { statusCode, body } = result;

      response.status(statusCode).json(body);
      return;
    }

    request.metadata = {
      ...request.metadata,
      ...result.data,
    };

    next();
  };
}
