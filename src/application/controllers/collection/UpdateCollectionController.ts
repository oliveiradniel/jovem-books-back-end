import { verifyCollectionErrors } from '../../../utils/verifyCollectionErrors';

import { CollectionIdSchema } from '../../schemas/collection/CollectionIdSchema';
import { UpdateCollectionSchema } from '../../schemas/collection/UpdateCollectionSchema';

import { UpdateCollectionUseCase } from '../../useCases/collection/UpdateCollectionUseCase';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateCollectionController implements IController {
  constructor(
    private readonly updateCollectionUseCase: UpdateCollectionUseCase,
  ) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      const collectionId = CollectionIdSchema.parse(params?.id);

      const data = UpdateCollectionSchema.parse({
        userId,
        ...body,
        updatedAt: new Date(),
      });

      await this.updateCollectionUseCase.execute({ collectionId, data });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyCollectionErrors(error);
    }
  }
}
