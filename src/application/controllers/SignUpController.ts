import { ZodError } from 'zod';

import { SignUpUseCase } from '../useCases/SignUpUseCase';

import { SignUpSchema } from './schemas/SignUpSchema';

import { UsernameAlreadyInUse } from '../errors/UsernameAlreadyInUse';
import { EmailAlreadyInUse } from '../errors/EmailAlreadyInUse';

import { IController, IRequest, IResponse } from '../interfaces/IController';

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

      if (error instanceof EmailAlreadyInUse) {
        return {
          statusCode: 409,
          body: { error: 'Email already in use' },
        };
      }

      if (error instanceof UsernameAlreadyInUse) {
        return {
          statusCode: 409,
          body: { error: 'Username already in use' },
        };
      }

      throw error;
    }
  }
}
