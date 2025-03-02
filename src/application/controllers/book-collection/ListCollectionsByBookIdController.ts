import { ZodError } from 'zod';

import { BookNotFound } from '../../errors/book/BookNotFound';
import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';
import { UserNotFound } from '../../errors/user/UserNotFound';

import { ListCollectionsByBookIdUseCase } from '../../useCases/book-collection/ListCollectionsByBookIdUseCase';

import { ListCollectionsByBookIdSchema } from '../../schemas/book-collection/ListCollectionsByBookIdSchema.ts';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListCollectionsByBookIdController implements IController {
  constructor(
    private readonly listCollectionsByBookIdUseCase: ListCollectionsByBookIdUseCase,
  ) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const data = ListCollectionsByBookIdSchema.parse({
        userId,
        bookId: params?.bookId,
      });

      const collections = await this.listCollectionsByBookIdUseCase.execute(
        data,
      );

      return {
        statusCode: 200,
        body: collections,
      };
    } catch (error) {
      if (error instanceof ZodError) {
        return {
          statusCode: 400,
          body: { error: error.errors[0].message },
        };
      }

      if (error instanceof BookNotFound) {
        return {
          statusCode: 404,
          body: { error: error.message },
        };
      }

      if (error instanceof CollectionNotFound) {
        return {
          statusCode: 404,
          body: { error: error.message },
        };
      }

      if (error instanceof UserNotFound) {
        return {
          statusCode: 404,
          body: { error: error.message },
        };
      }

      return {
        statusCode: 500,
        body: { error: 'Server Internal Error' },
      };
    }
  }
}
