import { verify } from 'jsonwebtoken';
import {
  IData,
  IMiddleware,
  IRequest,
  IResponse,
} from '../interfaces/IMiddleware';
import { env } from '../../config/env';

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers;

    if (!authorization) {
      return {
        statusCode: 401,
        body: { error: 'Invalid access token ' },
      };
    }

    try {
      const [bearer, token] = authorization.split(' ');

      if (bearer !== 'Bearer') {
        return {
          statusCode: 401,
          body: { error: 'Invalid access token' },
        };
      }

      const { sub } = verify(token, env.JWT_SECRET);

      return {
        data: {
          userId: sub,
        },
      };
    } catch {
      return {
        statusCode: 401,
        body: {
          error: 'Invalid access token',
        },
      };
    }
  }
}
