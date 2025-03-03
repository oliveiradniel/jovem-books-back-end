import { ZodError } from 'zod';

import { DeleteReadUseCase } from '../../useCases/read/DeleteReadUseCase';

import { IdsSchema } from '../../schemas/read/IdsSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';
import { ReadingNotFound } from '../../errors/read/ReadingNotFound';

export class DeleteReadController implements IController {
  constructor(private readonly deleteReadUseCase: DeleteReadUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const { bookId: parsedBookId, userId: parsedUserId } = IdsSchema.parse({
        userId,
        bookId: params?.bookId,
      });

      await this.deleteReadUseCase.execute({
        bookId: parsedBookId,
        userId: parsedUserId,
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
