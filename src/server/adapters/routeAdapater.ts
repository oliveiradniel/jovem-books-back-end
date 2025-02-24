import { Request, Response } from 'express';

import { IController } from '../../application/interfaces/IController';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    const { statusCode, body } = await controller.handle({
      body: request.body,
      userId: request.metadata?.userId,
    });

    response.status(statusCode).json(body);
  };
}
