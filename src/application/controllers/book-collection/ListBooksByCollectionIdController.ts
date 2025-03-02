import { ZodError } from 'zod';

import { BookNotFound } from '../../errors/book/BookNotFound';
import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';
import { UserNotFound } from '../../errors/user/UserNotFound';

import { ListBooksByCollectionIdUseCase } from '../../useCases/book-collection/ListBooksByCollectionIdUseCase';

import { ListBooksByCollectionIdSchema } from '../../schemas/book-collection/ListBookByCollectionIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListBooksByCollectionIdController implements IController {
  constructor(
    private readonly listBooksByCollectionIdUseCase: ListBooksByCollectionIdUseCase,
  ) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const data = ListBooksByCollectionIdSchema.parse({
        userId,
        collectionId: params?.collectionId,
      });

      const books = await this.listBooksByCollectionIdUseCase.execute(data);

      return {
        statusCode: 200,
        body: books,
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
