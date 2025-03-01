import { verifyCollectionErrors } from '../../../utils/verifyCollectionErrors';

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
      return verifyCollectionErrors(error);
    }
  }
}
