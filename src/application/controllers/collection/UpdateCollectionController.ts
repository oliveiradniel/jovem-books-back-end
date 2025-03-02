import { verifyCollectionErrors } from '../../../utils/verifyCollectionErrors';

import { UpdateCollectionUseCase } from '../../useCases/collection/UpdateCollectionUseCase';

import {
  IdsSchema,
  UpdateDataCollectionSchema,
} from '../../schemas/collection/UpdateCollectionSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class UpdateCollectionController implements IController {
  constructor(
    private readonly updateCollectionUseCase: UpdateCollectionUseCase,
  ) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      const { collectionId: parsedCollectionId, userId: parsedUserId } =
        IdsSchema.parse({ collectionId: params?.id, userId });

      const data = UpdateDataCollectionSchema.parse({
        name: body.name,
        updatedAt: new Date(),
      });

      await this.updateCollectionUseCase.execute({
        collectionId: parsedCollectionId,
        userId: parsedUserId,
        data,
      });

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyCollectionErrors(error);
    }
  }
}
