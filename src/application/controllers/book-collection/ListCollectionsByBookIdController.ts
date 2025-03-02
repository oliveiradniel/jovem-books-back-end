import { verifyBookCollectionErrors } from '../../../utils/verifyBookCollectionErrors';

import { ListCollectionsByBookIdUseCase } from '../../useCases/book-collection/ListCollectionsByBookIdUseCase';

import { ListCollectionsByBookIdSchema } from '../../schemas/book-collection/ListCollectionsByBookIdSchema.ts';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListCollectionsByBookIdController implements IController {
  constructor(
    private readonly listCollectionsByBookIdUseCase: ListCollectionsByBookIdUseCase,
  ) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const data = ListCollectionsByBookIdSchema.parse({
        userId,
        bookId: params?.bookId,
      });

      const collections = await this.listCollectionsByBookIdUseCase.execute(
        data,
      );

      return {
        statusCode: 200,
        body: collections,
      };
    } catch (error) {
      return verifyBookCollectionErrors(error);
    }
  }
}
