import { verifyCollectionErrors } from '../../../utils/verifyCollectionErrors';

import { DeleteCollectionUseCase } from '../../useCases/collection/DeleteCollectionUseCase';

import { DeleteCollectionSchema } from '../../schemas/collection/DeleteCollectionSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteCollectionController implements IController {
  constructor(
    private readonly deleteCollectionUseCase: DeleteCollectionUseCase,
  ) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const data = DeleteCollectionSchema.parse({
        collectionId: params?.id,
        userId,
      });

      await this.deleteCollectionUseCase.execute(data);

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyCollectionErrors(error);
    }
  }
}
