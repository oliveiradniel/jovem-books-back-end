import { ZodError } from 'zod';

import { NameAlreadyInUse } from '../../errors/collection/NameAlreadyInUse';
import { UserNotFound } from '../../errors/user/UserNotFound';

import { CreateCollectionUseCase } from '../../useCases/collection/CreateCollectionUseCase';

import { NameAndUserIdSchema } from '../../schemas/collection/NameAndUserIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateCollectionController implements IController {
  constructor(
    private readonly createCollectionUseCase: CreateCollectionUseCase,
  ) {}

  async handle({ body, userId }: IRequest): Promise<IResponse> {
    try {
      const collectionData = {
        userId,
        name: body.name,
      };

      const data = NameAndUserIdSchema.parse(collectionData);

      await this.createCollectionUseCase.execute(data);

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
