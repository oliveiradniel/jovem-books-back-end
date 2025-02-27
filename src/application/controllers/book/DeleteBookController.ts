import { ZodError } from 'zod';

import { DeleteBookUseCase } from '../../useCases/book/DeleteBookUseCase';

import { BookIdAndUserIdSchema } from '../schemas/book/BookIdAndUserIdSchema';

import { UserNotFound } from '../../errors/user/UserNotFound';
import { BookNotFound } from '../../errors/book/BookNotFound';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteBookController implements IController {
  constructor(private readonly deleteBookUseCase: DeleteBookUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const data = BookIdAndUserIdSchema.parse({ bookId: params?.id, userId });

      await this.deleteBookUseCase.execute({
        bookId: data.bookId,
        userId: data.userId,
      });

      return {
        statusCode: 200,
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

      if (error instanceof BookNotFound) {
        return {
          statusCode: 404,
          body: { error: 'Book not found' },
        };
      }

      throw error;
    }
  }
}
