import { ZodError } from 'zod';

import { CreateUserUseCase } from '../../useCases/user/CreateUserUseCase';

import { CreateUserSchema } from '../schemas/user/CreateUserSchema';

import { UsernameAlreadyInUse } from '../../errors/UsernameAlreadyInUse';
import { EmailAlreadyInUse } from '../../errors/EmailAlreadyInUse';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateUserController implements IController {
  constructor(private readonly createUserUpUseCase: CreateUserUseCase) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    try {
      const { username, firstName, lastName, email, password } =
        CreateUserSchema.parse(body);

      const user = {
        username,
        firstName,
        lastName,
        email,
        password,
      };

      await this.createUserUpUseCase.execute(user);

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
