import { verifyBookCollectionErrors } from '../../../utils/verifyBookCollectionErrors';

import { GetBookCollectionByIdUseCase } from '../../useCases/book-collection/GetBookCollectionByIdUseCase';

import { GetBookCollectionByIdSchema } from '../../schemas/book-collection/GetBookCollectionById';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class GetBookCollectionByIdController implements IController {
  constructor(
    private readonly getBookCollectionByIdUseCase: GetBookCollectionByIdUseCase,
  ) {}

  async handle({ userId, body }: IRequest): Promise<IResponse> {
    try {
      const data = GetBookCollectionByIdSchema.parse({
        bookCollectionId: {
          bookId: body.bookId,
          collectionId: body.collectionId,
        },
        userId,
      });

      const bookCollection = await this.getBookCollectionByIdUseCase.execute(
        data,
      );

      return {
        statusCode: 200,
        body: bookCollection,
      };
    } catch (error) {
      return verifyBookCollectionErrors(error);
    }
  }
}
