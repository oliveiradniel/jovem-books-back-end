import { SignUpUseCase } from '../useCases/SignUpUseCase';

import { IController } from '../interfaces/IController';
import { IRequest } from '../interfaces/IRequest';
import { IResponse } from '../interfaces/IResponse';
import { SignUpSchema } from './schemas/SignUpSchema';
import { ZodError } from 'zod';

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
      return {
        statusCode: 400,
        body: null,
      };
    }
  }
}
