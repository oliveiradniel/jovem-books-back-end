import { ZodError } from 'zod';

import { UserNotFound } from '../../errors/user/UserNotFound';

import { ListCollectionsUseCase } from '../../useCases/collection/ListCollectionsUseCase';

import { UserIdAndOrderBySchema } from '../../schemas/UserIdAndOrderBySchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListCollectionsController implements IController {
  constructor(
    private readonly listCollectionsUseCase: ListCollectionsUseCase,
  ) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const collectionData = {
        userId,
        orderBy: params?.orderBy,
      };

      const data = UserIdAndOrderBySchema.parse(collectionData);

      const collections = await this.listCollectionsUseCase.execute(data);

      return {
        statusCode: 200,
        body: { collections },
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
          statusCode: 400,
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
