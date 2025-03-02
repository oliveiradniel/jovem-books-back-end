import { verifyBookCollectionErrors } from '../../../utils/verifyBookCollectionErrors';

import { CreateBookCollectionUseCase } from '../../useCases/book-collection/CreateBookCollectionUseCase';

import { CreateBookCollectionSchema } from '../../schemas/book-collection/CreateBookCollectionSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class CreateBookCollectionController implements IController {
  constructor(
    private readonly createBookCollectionUseCase: CreateBookCollectionUseCase,
  ) {}

  async handle({ userId, body }: IRequest): Promise<IResponse> {
    try {
      const data = CreateBookCollectionSchema.parse({ userId, ...body });

      await this.createBookCollectionUseCase.execute(data);

      return {
        statusCode: 201,
        body: null,
      };
    } catch (error) {
      return verifyBookCollectionErrors(error);
    }
  }
}
