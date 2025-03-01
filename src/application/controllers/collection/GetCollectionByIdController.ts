import { ZodError } from 'zod';

import { UserNotFound } from '../../errors/user/UserNotFound';
import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';

import { GetCollectionByIdUseCase } from '../../useCases/collection/GetCollectionByIdUseCase';

import { GetCollectionByIdSchema } from '../../schemas/collection/GetCollectionByIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetCollectionByIdController implements IController {
  constructor(
    private readonly getCollectionByIdUseCase: GetCollectionByIdUseCase,
  ) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const collectionData = {
        userId,
        collectionId: params?.id,
      };

      const data = GetCollectionByIdSchema.parse(collectionData);

      const collection = await this.getCollectionByIdUseCase.execute(data);

      return {
        statusCode: 200,
        body: collection,
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
          body: { error: error.message },
        };
      }

      if (error instanceof CollectionNotFound) {
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
