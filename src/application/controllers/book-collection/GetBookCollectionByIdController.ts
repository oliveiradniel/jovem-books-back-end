import { ZodError } from 'zod';

import { BookNotFound } from '../../errors/book/BookNotFound';
import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';
import { UserNotFound } from '../../errors/user/UserNotFound';
import { BookCollectionNotFound } from '../../errors/book-collection/BookCollectionNotFound';

import { GetBookCollectionByIdUseCase } from '../../useCases/book-collection/GetBookCollectionByIdUseCase';

import { GetBookCollectionByIdSchema } from '../../schemas/book-collection/GetBookCollectionById';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetBookCollectionByIdController implements IController {
  constructor(
    private readonly getBookCollectionByIdUseCase: GetBookCollectionByIdUseCase,
  ) {}

  async handle({ userId, body }: IRequest): Promise<IResponse> {
    try {
      const data = GetBookCollectionByIdSchema.parse({
        bookCollectionId: {
          bookId: body.bookId,
          collectionId: body.collectionId,
        },
        userId,
      });

      const bookCollection = await this.getBookCollectionByIdUseCase.execute(
        data,
      );

      return {
        statusCode: 200,
        body: bookCollection,
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

      if (error instanceof BookCollectionNotFound) {
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
