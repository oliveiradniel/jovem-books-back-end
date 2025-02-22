import { ZodError } from 'zod';

import { SignUpUseCase } from '../useCases/SignUpUseCase';

import { SignUpSchema } from './schemas/SignUpSchema';

import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';

import { IController } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { IResponse } from '../interfaces/IResponse';

export class SignUpController implements IController {
  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { username, firstName, lastName, email, password } =
        SignUpSchema.parse(body);

      const user = {
        username,
        firstName,
        lastName,
        email,
        password,
      };

      const signUpUseCase = new SignUpUseCase();

      await signUpUseCase.execute(user);

      return {
        statusCode: 201,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: error.issues,
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: { error: 'This username or this e-mail already in use' },
        };
      }

      return {
        statusCode: 400,
        body: null,
      };
    }
  }
}
