import { verifyCollectionErrors } from '../../../utils/verifyCollectionErrors';

import { CreateCollectionUseCase } from '../../useCases/collection/CreateCollectionUseCase';

import { CreateCollectionSchema } from '../../schemas/collection/CreateCollectionSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateCollectionController implements IController {
  constructor(
    private readonly createCollectionUseCase: CreateCollectionUseCase,
  ) {}

  async handle({ body, userId }: IRequest): Promise<IResponse> {
    try {
      const data = CreateCollectionSchema.parse({ userId, name: body.name });

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
