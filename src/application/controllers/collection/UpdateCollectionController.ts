import { ZodError } from 'zod';

import { CollectionNotFound } from '../../errors/collection/CollectionNotFound';
import { UserNotFound } from '../../errors/user/UserNotFound';
import { NameAlreadyInUse } from '../../errors/collection/NameAlreadyInUse';

import { UpdateCollectionSchema } from '../../schemas/collection/UpdateCollectionSchema';

import { UpdateCollectionUseCase } from '../../useCases/collection/UpdateCollectionUseCase';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateCollectionController implements IController {
  constructor(
    private readonly updateCollectionUseCase: UpdateCollectionUseCase,
  ) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      const collectionData = {
        id: params?.id,
        userId,
        name: body.name,
        updatedAt: new Date(),
      };

      const data = UpdateCollectionSchema.parse(collectionData);

      await this.updateCollectionUseCase.execute(data);

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

      if (error instanceof NameAlreadyInUse) {
        return {
          statusCode: 409,
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
