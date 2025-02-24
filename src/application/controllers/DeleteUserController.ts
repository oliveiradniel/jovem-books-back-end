import { DeleteUserUseCase } from '../useCases/DeleteUserUseCase';

import { IdSchema } from './schemas/IdSchema';

import { IController, IRequest, IResponse } from '../interfaces/IController';
import { ZodError } from 'zod';
import { UserNotFound } from '../errors/UserNotFound';

export class DeleteUserController implements IController {
  constructor(private readonly deleteUserUseCase: DeleteUserUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const id = IdSchema.parse(userId);

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
