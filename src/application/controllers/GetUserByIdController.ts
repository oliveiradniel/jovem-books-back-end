import { ZodError } from 'zod';

import { GetUserByIdUseCase } from '../useCases/GetUserByIdUseCase';

import { UserNotFound } from '../errors/UserNotFound';
import { IdIsRequired } from '../errors/IdIsRequired';

import { IdSchema } from './schemas/IdSchema';

import { IController, IRequest, IResponse } from '../interfaces/IController';

export class GetUserByIdController implements IController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const id = IdSchema.parse(userId);

      const user = await this.getUserByIdUseCase.execute({ id });

      return {
        statusCode: 201,
        body: { user },
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: error.errors[0].message },
        };
      }
      if (error instanceof IdIsRequired) {
        return {
          statusCode: 400,
          body: { error: 'Id is required' },
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
