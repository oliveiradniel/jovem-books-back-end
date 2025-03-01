import { verifyCollectionErrors } from '../../../utils/verifyCollectionErrors';

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
      return verifyCollectionErrors(error);
    }
  }
}
