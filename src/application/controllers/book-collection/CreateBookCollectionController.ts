import { ZodError } from 'zod';

import { BookNotFound } from '../../errors/book/BookNotFound';
import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';
import { UserNotFound } from '../../errors/user/UserNotFound';

import { CreateBookCollectionUseCase } from '../../useCases/book-collection/CreateBookCollectionUseCase';

import { CreateBookCollectionSchema } from '../../schemas/book-collection/CreateBookCollectionSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateBookCollectionController implements IController {
  constructor(
    private readonly createBookCollectionUseCase: CreateBookCollectionUseCase,
  ) {}

  async handle({ userId, body }: IRequest): Promise<IResponse> {
    try {
      const data = CreateBookCollectionSchema.parse({ userId, ...body });

      await this.createBookCollectionUseCase.execute(data);

      return {
        statusCode: 201,
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
