import { z, ZodError } from 'zod';

import { GetUserByIdUseCase } from '../../useCases/user/GetUserByIdUseCase';

import { UserNotFound } from '../../errors/user/UserNotFound';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetUserByIdController implements IController {
  constructor(private readonly getUserByIdUseCase: GetUserByIdUseCase) {}

  async handle({ userId }: IRequest): Promise<IResponse> {
    try {
      const Schema = z
        .string({ message: 'Id must be a string' })
        .uuid({ message: 'Invalid uuid' });

      const data = Schema.parse(userId);

      const user = await this.getUserByIdUseCase.execute(data);

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
