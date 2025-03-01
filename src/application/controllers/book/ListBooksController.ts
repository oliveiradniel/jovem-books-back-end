import { verifyBookErrors } from '../../../utils/verifyBookErrors';

import { ListBooksUseCase } from '../../useCases/book/ListBooksUseCase';

import { UserIdAndOrderBySchema } from '../../schemas/UserIdAndOrderBySchema';

import { IController, IRequest, IResponse } from '../../interfaces/IController';

export class ListBooksController implements IController {
  constructor(private readonly listBooksUseCase: ListBooksUseCase) {}

  async handle({ userId, params }: IRequest): Promise<IResponse> {
    try {
      const bookData = {
        userId,
        orderBy: params?.orderBy,
      };

      const data = UserIdAndOrderBySchema.parse(bookData);

      const books = await this.listBooksUseCase.execute(data);

      return {
        statusCode: 200,
        body: { books },
      };
    } catch (error) {
      return verifyBookErrors(error);
    }
  }
}
