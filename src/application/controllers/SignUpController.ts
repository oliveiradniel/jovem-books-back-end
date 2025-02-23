import { ZodError } from 'zod';

import { SignUpUseCase } from '../useCases/SignUpUseCase';

import { SignUpSchema } from './schemas/SignUpSchema';

import { AccountAlreadyExists } from '../errors/AccountAlreadyExists';
import { UsernameAlreadyExists } from '../errors/UsernameAlreadyExists';

import { IController } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { IResponse } from '../interfaces/IResponse';

export class SignUpController implements IController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

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

      await this.signUpUseCase.execute(user);

      return {
        statusCode: 201,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: error.errors[0].message },
        };
      }

      if (error instanceof AccountAlreadyExists) {
        return {
          statusCode: 409,
          body: { error: 'This credentials already in use' },
        };
      }

      if (error instanceof UsernameAlreadyExists) {
        return {
          statusCode: 409,
          body: { error: 'This username already in use' },
        };
      }

      throw error;
    }
  }
}
