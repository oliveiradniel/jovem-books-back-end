import { verifyCollectionErrors } from '../../../utils/verifyCollectionErrors';

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
      return verifyCollectionErrors(error);
    }
  }
}
