import { verifyCollectionErrors } from '../../../utils/verifyCollectionErrors';

import { ListCollectionsUseCase } from '../../useCases/collection/ListCollectionsUseCase';

import { ListCollectionsSchema } from '../../schemas/collection/ListCollectionsSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListCollectionsController implements IController {
  constructor(
    private readonly listCollectionsUseCase: ListCollectionsUseCase,
  ) {}

  async handle({ userId, queryParams }: IRequest): Promise<IResponse> {
    try {
      const data = ListCollectionsSchema.parse({
        userId,
        orderBy: queryParams?.orderBy,
      });

      const collections = await this.listCollectionsUseCase.execute(data);

      return {
        statusCode: 200,
        body: { collections },
      };
    } catch (error) {
      return verifyCollectionErrors(error);
    }
  }
}
