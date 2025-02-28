import { ZodError } from 'zod';

import { hash } from 'bcrypt';

import { UpdateUserUseCase } from '../../useCases/user/UpdateUserUseCase';
import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';

import { UpdateUserSchema } from '../schemas/user/UpdateUserSchema';

import { UserNotFound } from '../../errors/user/UserNotFound';
import { EmailAlreadyInUse } from '../../errors/user/EmailAlreadyInUse';
import { UsernameAlreadyInUse } from '../../errors/user/UsernameAlreadyInUse';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateUserController implements IController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
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
        updatedAt: new Date(),
      };

      const data = UpdateUserSchema.parse(userData);

      const user = await this.getUserByIdUseCase.execute(data.id);

      let hashedPassword = data.password;
      if (data.password) {
        hashedPassword = await hash(data.password!, 10);
      }

      await this.updateUserUseCase.execute({
        id: data.id,
        data: {
          username: data.username ?? user.username,
          email: data.email ?? user.email,
          password: hashedPassword ?? user.password,
          firstName: data.firstName ?? user.firstName,
          lastName: data.lastName ?? user.lastName,
          updatedAt: new Date(),
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
