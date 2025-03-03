import { ZodError } from 'zod';

import { GetReadByIdUseCase } from '../../useCases/read/GetReadByBookIdUseCase';

import { IdsSchema } from '../../schemas/read/IdsSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';
import { ReadingNotFound } from '../../errors/read/ReadingNotFound';

export class GetReadByIdController implements IController {
  constructor(private readonly getReadByIdUseCase: GetReadByIdUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const { bookId: parsedBookId, userId: parsedUserId } = IdsSchema.parse({
        userId,
        bookId: params?.bookId,
      });

      const read = await this.getReadByIdUseCase.execute({
        bookId: parsedBookId,
        userId: parsedUserId,
      });

      return {
        statusCode: 201,
        body: read,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: error.errors[0].message },
        };
      }

      if (error instanceof ReadingNotFound) {
        return {
          statusCode: 404,
          body: { error: error.message },
        };
      }

      return {
        statusCode: 500,
        body: { error: 'Internal Server Error' },
      };
    }
  }
}
