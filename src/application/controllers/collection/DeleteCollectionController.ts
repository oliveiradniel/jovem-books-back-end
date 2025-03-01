import { ZodError } from 'zod';

import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';
import { UserNotFound } from '../../errors/user/UserNotFound';

import { DeleteCollectionUseCase } from '../../useCases/collection/DeleteCollectionUseCase';

import { DeleteCollectionSchema } from '../../schemas/collection/DeleteCollectionSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteCollectionController implements IController {
  constructor(
    private readonly deleteCollectionUseCase: DeleteCollectionUseCase,
  ) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const collectionData = {
        collectionId: params?.id,
        userId,
      };

      const data = DeleteCollectionSchema.parse(collectionData);

      await this.deleteCollectionUseCase.execute(data);

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
        body: { error: 'Internal Server Error' },
      };
    }
  }
}
