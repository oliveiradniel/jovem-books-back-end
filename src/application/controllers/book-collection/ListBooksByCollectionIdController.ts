import { verifyBookCollectionErrors } from '../../../utils/verifyBookCollectionErrors';

import { ListBooksByCollectionIdUseCase } from '../../useCases/book-collection/ListBooksByCollectionIdUseCase';

import { ListBooksByCollectionIdSchema } from '../../schemas/book-collection/ListBookByCollectionIdSchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListBooksByCollectionIdController implements IController {
  constructor(
    private readonly listBooksByCollectionIdUseCase: ListBooksByCollectionIdUseCase,
  ) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const data = ListBooksByCollectionIdSchema.parse({
        userId,
        collectionId: params?.collectionId,
      });

      const books = await this.listBooksByCollectionIdUseCase.execute(data);

      return {
        statusCode: 200,
        body: books,
      };
    } catch (error) {
      return verifyBookCollectionErrors(error);
    }
  }
}
