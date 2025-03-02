import { ZodError } from 'zod';

import { BookNotFound } from '../../errors/book/BookNotFound';
import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';
import { UserNotFound } from '../../errors/user/UserNotFound';

import { DeleteBookCollectionUseCase } from '../../useCases/book-collection/DeleteBookCollectionUseCase';

import { DeleteBookCollectionSchema } from '../../schemas/book-collection/DeleteBookCollectionSchema.ts';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteBookCollectionController implements IController {
  constructor(
    private readonly deleteBookCollectionUseCase: DeleteBookCollectionUseCase,
  ) {}

  async handle({ userId, body }: IRequest): Promise<IResponse> {
    try {
      const data = DeleteBookCollectionSchema.parse({
        userId,
        bookCollectionId: {
          bookId: body.bookId,
          collectionId: body.collectionId,
        },
      });

      await this.deleteBookCollectionUseCase.execute(data);

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
