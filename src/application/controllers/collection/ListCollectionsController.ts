import { verifyCollectionErrors } from '../../../utils/verifyCollectionErrors';

import { ListCollectionsUseCase } from '../../useCases/collection/ListCollectionsUseCase';

import { UserIdAndOrderBySchema } from '../../schemas/UserIdAndOrderBySchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListCollectionsController implements IController {
  constructor(
    private readonly listCollectionsUseCase: ListCollectionsUseCase,
  ) {}

  async handle({ userId, queryParams }: IRequest): Promise<IResponse> {
    try {
      const collectionData = {
        userId,
        orderBy: queryParams?.orderBy,
      };

      const data = UserIdAndOrderBySchema.parse(collectionData);

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
