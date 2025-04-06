import { Request, Response } from 'express';

import { IController } from '../../application/interfaces/IController';

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response) => {
    console.log(request.body);
    const { statusCode, body } = await controller.handle({
      userId: request.metadata?.userId,
      body: request.body,
      params: request.params,
      queryParams: request.query,
      file: request.file!,
    });

    response.status(statusCode).json(body);
  };
}
