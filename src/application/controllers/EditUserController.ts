import { ZodError } from 'zod';

import { hash } from 'bcrypt';

import { EditUserSchema } from './schemas/EditUserSchema';
import { EditUserUseCase } from '../useCases/EditUserUseCase';
import { GetUserByIdUseCase } from '../useCases/GetUserByIdUseCase';

import { UserNotFound } from '../errors/UserNotFound';
import { EmailAlreadyInUse } from '../errors/EmailAlreadyInUse';
import { UsernameAlreadyInUse } from '../errors/UsernameAlreadyInUse';

import { IController, IRequest, IResponse } from '../interfaces/IController';

export class EditUserController implements IController {
  constructor(
    private readonly editUserUseCase: EditUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
  ) {}

  async handle({ body, userId }: IRequest): Promise<IResponse> {
    try {
      const userData = {
        id: userId,
        username: body.username,
        email: body.email,
        password: body.password,
        firstName: body.firstName,
        lastName: body.lastName,
      };

      const { id, username, email, password, firstName, lastName } =
        EditUserSchema.parse(userData);

      const user = await this.getUserByIdUseCase.execute({ id });

      const hashedPassword = await hash(password!, 10);

      await this.editUserUseCase.execute(id, {
        user: {
          username: username ?? user.username,
          email: email ?? user.email,
          password: (password && hashedPassword) ?? user.password,
          firstName: firstName ?? user.firstName,
          lastName: lastName ?? user.lastName,
        },
      });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: error.errors[0].message },
        };
      }

      if (error instanceof UserNotFound) {
        return {
          statusCode: 404,
          body: { error: 'User not found' },
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
