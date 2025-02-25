import { z, ZodError } from 'zod';

import { DeleteUserUseCase } from '../../useCases/user/DeleteUserUseCase';

import { UserNotFound } from '../../errors/UserNotFound';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const Schema = z
        .string({ message: 'Id must be a string' })
        .uuid({ message: 'Invalid uuid' });

      const id = Schema.parse(userId);

      await this.deleteUserUseCase.execute(id);

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

      throw error;
    }
  }
}
