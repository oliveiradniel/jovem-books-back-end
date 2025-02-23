import { ZodError } from 'zod';

import { InvalidCredentials } from '../errors/InvalidCredentials';

import { SignInUseCase } from '../useCases/SignInUseCase';

import { SignInSchema } from './schemas/SignInSchema';

import { IController } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { IResponse } from '../interfaces/IResponse';

export class SignInControler implements IController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { username, password } = SignInSchema.parse(body);

      const credentials = { username, password };

      const { accessToken } = await this.signInUseCase.execute(credentials);

      return {
        statusCode: 200,
        body: { accessToken },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: error.errors[0].message },
        };
      }

      if (error instanceof InvalidCredentials) {
        return {
          statusCode: 401,
          body: { error: 'Invalid credentials' },
        };
      }

      throw error;
    }
  }
}
