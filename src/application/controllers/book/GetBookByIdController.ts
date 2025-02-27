import { ZodError } from 'zod';

import { GetBookByIdUseCase } from '../../useCases/book/GetBookByIdUseCase';

import { BookIdAndUserIdSchema } from '../schemas/book/BookIdAndUserIdSchema';

import { UserNotFound } from '../../errors/user/UserNotFound';
import { BookNotFound } from '../../errors/book/BookNotFound';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetBookByIdController implements IController {
  constructor(private readonly getBookByIdUseCase: GetBookByIdUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const data = BookIdAndUserIdSchema.parse({ userId, bookId: params?.id });

      const book = await this.getBookByIdUseCase.execute({
        bookId: data.bookId,
        userId: data.userId,
      });

      return {
        statusCode: 200,
        body: book,
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
