import { verifyBookCollectionErrors } from '../../../utils/verifyBookCollectionErrors';

import { DeleteBookCollectionUseCase } from '../../useCases/book-collection/DeleteBookCollectionUseCase';

import { DeleteBookCollectionSchema } from '../../schemas/book-collection/DeleteBookCollectionSchema.ts';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class DeleteBookCollectionController implements IController {
  constructor(
    private readonly deleteBookCollectionUseCase: DeleteBookCollectionUseCase,
  ) {}

  async handle({ userId, body, params }: IRequest): Promise<IResponse> {
    try {
      const data = DeleteBookCollectionSchema.parse({
        userId,
        bookCollectionId: {
          bookId: body.bookId,
          collectionId: params?.collectionId,
        },
      });

      await this.deleteBookCollectionUseCase.execute(data);

      return {
        statusCode: 204,
        body: null,
      };
    } catch (error) {
      return verifyBookCollectionErrors(error);
    }
  }
}
